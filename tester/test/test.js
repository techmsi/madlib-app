'use strict';

const test = require('tape');

const add = (a, b) => a + b;

test('The add method', (assert) => {
  var actual = add(1, 2);
  var expected = 3;

  assert.equal(actual, expected, 'should add 2 numbers');
  assert.end();
});

test('successful test', (t) => {
  t.equal(1, 1);
  t.end();
});
