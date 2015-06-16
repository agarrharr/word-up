var check = require('check-types');

function verify(grid) {
  check.verify.array(grid, 'expecting an array of arrays');
  var rows = grid.length;
  if (rows < 1) {
    throw new Error('invalid number of ros ' + rows);
  }

  var columns = grid[0].length;
  grid.forEach(function (row, index) {
    check.verify.array(row, 'expected array at ' + index);
    if (row.length !== columns) {
      throw new Error('Expected ' + columns + ' columns in row ' + index +
        ', found ' + row.length);
    }
  });
}

function inside(grid, row, column) {
  if (row < 0 || column < 0) { return false; }
  if (row >= grid.length) { return false; }
  if (column >= grid[row].length) { return false; }
  return true;
}

module.exports = {
  inside: inside,
  verify: verify
};
