import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import Note from '../src/lib/db/models/Note.js';
import { parseNoteContent, serializeNoteContent, getNoteTextLength, getNoteContentError, MAX_NOTE_CONTENT_BYTES } from '../src/utils/noteContent.js';

const picture = (id, fileName = 'workout.png') => ({
  type: 'image', id: 'image_' + id, fileName,
  dataUrl: 'data:image/png;base64,' + 'A'.repeat(80000),
});

test('picture data does not use the text allowance, including database validation', () => {
  const content = serializeNoteContent([{ type: 'text', text: 'Workout notes' }, picture('1')]);
  assert.ok(content.length > 50000);
  assert.equal(getNoteTextLength(content), 13);
  assert.equal(getNoteContentError(content), '');
  const note = new Note({ userId: new mongoose.Types.ObjectId(), title: 'Workout', content });
  assert.equal(note.validateSync(), undefined);
  const reopened = parseNoteContent(JSON.parse(JSON.stringify(note)).content);
  assert.equal(reopened[1].dataUrl, picture('1').dataUrl);
});

test('multiple pictures with identical or reserved-character filenames round-trip independently', () => {
  const first = picture('1', 'workout [day:1].png');
  const second = picture('2', first.fileName);
  const content = serializeNoteContent([{ type: 'text', text: 'Before' }, first, { type: 'text', text: 'Between' }, second, { type: 'text', text: 'After' }]);
  const parts = parseNoteContent(content);
  assert.equal(parts[1].fileName, first.fileName);
  assert.equal(parts[3].id, second.id);
  assert.equal(serializeNoteContent(parts), content);
  const removed = serializeNoteContent(parts.filter(part => part.id !== first.id));
  assert.equal(parseNoteContent(removed).filter(part => part.type === 'image').length, 1);
  assert.match(removed, /BeforeBetween/);
});

test('plain text and legacy embedded images/videos are preserved', () => {
  const content = 'Before[IMAGE:media_123:old.png:data:image/png;base64,AAAA]After[VIDEO:media_456:old.mp4:data:video/mp4;base64,AAAA]';
  assert.equal(serializeNoteContent(parseNoteContent(content)), content);
  assert.equal(getNoteTextLength(content), 11);
  assert.equal(getNoteContentError('plain text'), '');
  assert.equal(getNoteContentError(serializeNoteContent([picture('only')])), '');
});

test('empty, oversized text, and oversized image payloads remain invalid', () => {
  for (const value of ['', '   ', null, {}, 42]) assert.ok(getNoteContentError(value));
  assert.equal(getNoteContentError('a'.repeat(50000)), '');
  assert.match(getNoteContentError('a'.repeat(50001)), /50,000/);
  const huge = serializeNoteContent([{ ...picture('big'), dataUrl: 'data:image/png;base64,' + 'A'.repeat(MAX_NOTE_CONTENT_BYTES) }]);
  assert.match(getNoteContentError(huge), /too large/);
  assert.ok(new Note({ userId: new mongoose.Types.ObjectId(), title: 'Too big', content: huge }).validateSync());
});
