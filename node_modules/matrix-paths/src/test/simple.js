var paths = require('../paths').paths;

gt.module('simple paths');

gt.test('basics', function () {
  gt.arity(paths, 2);
});

gt.test('1x1', function () {
  var m = [['a']];
  var ps = paths(m);
  gt.array(ps, 'got arrays from 1x1');
  gt.equal(ps.length, 1, 'single string');
});