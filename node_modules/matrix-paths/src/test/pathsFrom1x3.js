var pf = require('../pathsFrom').pathsFrom;

gt.module('paths in 1x3');

var m = [['a'], ['b'], ['c']];

gt.test('1x3 left', function () {
  var paths = pf(m, 0, 0);
  gt.array(paths, 'got arrays from 1x1');
  gt.equal(paths.length, 1, 'single string');
  gt.equal(paths[0], 'abc');
});

gt.test('1x3 right', function () {
  var paths = pf(m, 2, 0);
  gt.array(paths, 'got arrays from 1x1');
  gt.equal(paths.length, 1, 'single string');
  gt.equal(paths[0], 'cba');
});

gt.test('1x3 middle', function () {
  var paths = pf(m, 1, 0);
  gt.array(paths, 'got arrays from 1x1');
  gt.equal(paths.length, 2, 'two answers');
  gt.equal(paths[0], 'ba');
  gt.equal(paths[1], 'bc');
});