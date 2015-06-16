var pf = require('../pathsFrom').pathsFrom;

gt.module('paths in 4x4');

var m = [
['00', '01', '02', '03'],
['10', '11', '12', '13'],
['20', '21', '22', '23'],
['30', '31', '32', '33']];

gt.test('4x4 top left simple', function () {
  var paths = pf(m, 0, 0, {
    simple: true
  });
  gt.array(paths, 'got arrays from 4x4');
  gt.equal(paths.length, 548, 'around 500 paths');
});