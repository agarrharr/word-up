var pf = require('../pathsFrom').pathsFrom;

gt.module('end condition');

var m = [['a', 'b'], ['c', 'd']];

gt.test('2x2 with max path length 2', function () {
  var paths = pf(m, 0, 0, {
    simple: true,
    stepWhile: function (path) {
      return path.length < 2;
    }
  });
  gt.equal(paths.length, 2, 'only 2 ways');
  gt.equal(paths[0], 'ac');
  gt.equal(paths[1], 'ab');
});

gt.test('2x2 without letter b', function () {
  var aaab = [['a', 'a'], ['a', 'b']];
  var paths = pf(aaab, 0, 0, {
    simple: true,
    stepWhile: function (path, x, y, grid) {
      return grid[x][y] !== 'b';
    }
  });
  gt.equal(paths.length, 2, 'only 2 ways');
  gt.equal(paths[0], 'aa');
  gt.equal(paths[1], 'aa');
});