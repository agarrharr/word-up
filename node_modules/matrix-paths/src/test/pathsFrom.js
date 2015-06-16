var pf = require('../pathsFrom').pathsFrom;

gt.module('paths from 1x1');

gt.test('basics', function () {
  gt.arity(pf, 4, 'expects arguments');
});

gt.test('1x1', function () {
  var m = [['a']];
  var paths = pf(m, 0, 0);
  gt.array(paths, 'got arrays from 1x1');
  gt.equal(paths.length, 1, 'single string');
  gt.equal(paths[0], 'a');
});

gt.test('cannot start from outside', function () {
  gt.raises(function () {
    var m = [['a']];
    pf(m, 1, 0);
  }, Error, 'invalid starting poing')
});

gt.test('1x2', function () {
  var m = [['a', 'b']];
  var paths = pf(m, 0, 0);
  gt.equal(paths.length, 1);
  gt.equal(paths[0], 'ab');
});

gt.test('1x2 reverse', function () {
  var m = [['a', 'b']];
  var paths = pf(m, 0, 1);
  gt.equal(paths.length, 1);
  gt.equal(paths[0], 'ba');
});

gt.test('2x1', function () {
  var m = [['a'], ['b']];
  var paths = pf(m, 0, 0);
  gt.equal(paths.length, 1);
  gt.equal(paths[0], 'ab');
});

gt.test('2x1 reverse', function () {
  var m = [['a'], ['b']];
  var paths = pf(m, 1, 0);
  gt.equal(paths.length, 1);
  gt.equal(paths[0], 'ba');
});