/* eslint-disable */

QUnit.module('Check to see if tests are working', (asserts) => {
  QUnit.test('if 1, equal 1', (asserts) => {
    asserts.equal(1, 1, '1 does equal 1');
  });
});

// QUnit.module('See if function makeUrl works', (asserts) => {
//   QUnit.test('return the correct url', (asserts) => {
//     asserts.equal(makeUrl('noun', '4', 'ab'), 'https://warm-bayou-62114.herokuapp.com/api/words?type=noun&id=4&query=ab', 'this creates the correct url');
//   });
