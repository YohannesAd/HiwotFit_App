import { afterEach, beforeEach, mock, test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import dbConnect from '../src/lib/db/connect.js';

const originalUri = process.env.MONGODB_URI;

beforeEach(() => {
  global.mongoose.conn = null;
  global.mongoose.promise = null;
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/connection-test';
});

afterEach(() => {
  mock.restoreAll();
  if (originalUri === undefined) delete process.env.MONGODB_URI;
  else process.env.MONGODB_URI = originalUri;
});

test('a failed connection is cleared so the next request can recover', async () => {
  const failure = new Error('querySrv ENOTFOUND _mongodb._tcp.example.invalid');
  const connection = {};
  let attempts = 0;
  mock.method(mongoose, 'connect', async () => {
    if (++attempts === 1) throw failure;
    return connection;
  });
  await assert.rejects(dbConnect(), error => {
    assert.match(error.message, /DNS lookup failed/);
    assert.equal(error.cause, failure);
    return true;
  });
  assert.equal(global.mongoose.promise, null);
  assert.equal(await dbConnect(), connection);
  assert.equal(attempts, 2);
});

test('concurrent requests share a connection and reuse it after success', async () => {
  const connection = {};
  const connect = mock.method(mongoose, 'connect', async () => connection);
  assert.deepEqual(await Promise.all([dbConnect(), dbConnect()]), [connection, connection]);
  assert.equal(await dbConnect(), connection);
  assert.equal(connect.mock.callCount(), 1);
});

test('missing configuration fails at request time and can be corrected', async () => {
  delete process.env.MONGODB_URI;
  const connect = mock.method(mongoose, 'connect', async () => ({}));
  await assert.rejects(dbConnect(), /MONGODB_URI/);
  assert.equal(connect.mock.callCount(), 0);
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/connection-test';
  await dbConnect();
  assert.equal(connect.mock.callCount(), 1);
});
