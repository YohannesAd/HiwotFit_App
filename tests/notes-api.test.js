// Exercise the actual route handlers with isolated in-memory persistence.
// Run: node --experimental-vm-modules --test tests/notes-api.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SourceTextModule, SyntheticModule } from 'node:vm';
import { NextResponse } from 'next/server.js';
import mongoose from 'mongoose';
import Note from '../src/lib/db/models/Note.js';
import * as contentUtils from '../src/utils/noteContent.js';

test('create, reopen, edit and reopen a note containing text and multiple pictures', async () => {
  const user = { id: new mongoose.Types.ObjectId().toString() };
  const records = new Map();
  const repository = {
    async create(data) {
      const doc = new Note(data);
      await doc.validate();
      records.set(doc.id, doc);
      return doc;
    },
    async findOne(query) {
      const doc = records.get(query._id);
      return doc?.userId.toString() === query.userId ? doc : null;
    },
    async findOneAndUpdate(query, data, options) {
      assert.equal(options.runValidators, true);
      const doc = await this.findOne(query);
      if (!doc) return null;
      doc.set(data);
      await doc.validate();
      return doc;
    },
  };
  const dependencies = {
    'next/server': { NextResponse },
    'mongoose': { default: mongoose },
    '@/lib/db/connect': { default: async () => {} },
    '@/lib/db/models/Note': { default: repository },
    '@/lib/auth/jwt': { getCurrentUser: async () => user },
    '@/utils/noteContent': contentUtils,
  };
  async function loadRoute(file) {
    const routeModule = new SourceTextModule(await readFile(new URL(file, import.meta.url), 'utf8'));
    await routeModule.link(specifier => {
      const exports = dependencies[specifier];
      assert.ok(exports, 'Unexpected dependency: ' + specifier);
      return new SyntheticModule(Object.keys(exports), function () {
        for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
      });
    });
    await routeModule.evaluate();
    return routeModule.namespace;
  }
  const collection = await loadRoute('../src/app/api/notes/route.js');
  const individual = await loadRoute('../src/app/api/notes/[id]/route.js');
  const first = { type: 'image', id: 'image_1', fileName: 'workout.png', dataUrl: 'data:image/png;base64,' + 'A'.repeat(80000) };
  const second = { ...first, id: 'image_2' };
  const content = contentUtils.serializeNoteContent([{ type: 'text', text: 'Workout notes' }, first, second]);
  const request = body => ({ json: async () => body });
  const createdResponse = await collection.POST(request({ title: 'Workout', content }));
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  const params = { params: Promise.resolve({ id: created._id }) };
  const reopened = await (await individual.GET(null, params)).json();
  assert.equal(reopened.content, content);
  assert.equal(contentUtils.parseNoteContent(reopened.content).filter(part => part.type === 'image').length, 2);

  const editedContent = content.replace('Workout notes', 'Updated workout notes');
  const updatedResponse = await individual.PUT(request({ title: 'Edited', content: editedContent }), params);
  assert.equal(updatedResponse.status, 200);
  assert.equal((await (await individual.GET(null, params)).json()).content, editedContent);

  for (const invalidContent of [' ', 'A'.repeat(50001)]) {
    assert.equal((await collection.POST(request({ title: 'Invalid', content: invalidContent }))).status, 400);
    assert.equal((await individual.PUT(request({ title: 'Invalid', content: invalidContent }), params)).status, 400);
  }
});
