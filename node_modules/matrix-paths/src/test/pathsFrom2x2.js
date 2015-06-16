var pf = require('../pathsFrom').pathsFrom;

gt.module('paths in 2x2');

var m = [['a', 'b'], ['c', 'd']];

/** @sample */
gt.test('2x2 from top left with diagonal', function () {
  var G = [['a', 'b'], ['c', 'd']];
  var paths = pf(G, 0, 0);
  gt.equal(paths.length, 6, '6 ways');
});

/** @sample */
gt.test('2x2 from top left', function () {
  var G = [['a', 'b'], ['c', 'd']];
  var paths = pf(G, 0, 0, {
    simple: true
  });
  gt.equal(paths.length, 2, '2 ways');
});

gt.test('2x2 top left', function () {
  var paths = pf(m, 0, 0);
  gt.array(paths, 'got arrays from 2x2');
  gt.equal(paths.length, 6, '6 ways');
  gt.ok(paths.every(function (path) {
    return path.length === 4;
  }));
});