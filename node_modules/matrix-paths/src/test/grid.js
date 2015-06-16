var grid = require('../grid');

gt.module('grid verify');
var verify = grid.verify;

gt.test('square 2x2 grid', function () {
  var G = [['a', 'b'], ['a', 'b']];
  verify(G);
});

gt.test('square 3x3 grid', function () {
  var G = [['a', 'b', 'c'],
  ['1', '2', '3'],
  ['z', 'x', 'y']];
  verify(G);
});

gt.test('2x3 grid', function () {
  var G = [['a', 'b', 'c'],
  ['1', '2', '3']];
  verify(G);
});

gt.test('empty grid', function () {
  var G = [];
  gt.raises(function () {
    verify(G);
  }, Error, 'invalid empty grid');
});

gt.test('different rows grid', function () {
  var G = [['a'], [1, 2]];
  gt.raises(function () {
    verify(G);
  }, Error, 'invalid grid 1, 2');
});

gt.module('grid inside');
var inside = grid.inside;

gt.test('basics', function () {
  gt.arity(inside, 3, 'takes 3 arguments')
});

gt.test('1x1 positive', function () {
  var G = [['a']];
  gt.ok(inside(G, 0, 0));
});

gt.test('1x1 negative', function () {
  var G = [['a']];
  gt.ok(!inside(G, 1, 0));
  gt.ok(!inside(G, 0, 1));
  gt.ok(!inside(G, 1, 1));
  gt.ok(!inside(G, -1, 0));
  gt.ok(!inside(G, -1, -1));
});

gt.test('2x1 grid', function () {
  var G = [['a'], ['b']];
  gt.ok(inside(G, 0, 0));
  gt.ok(inside(G, 1, 0));
  gt.ok(!inside(G, 2, 0));
  gt.ok(!inside(G, 0, 1));
});