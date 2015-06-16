var check = require('check-types');

var verify = require('./grid').verify;
var inside = require('./grid').inside;

var noop = function (path, r, c, grid) {
  return true;
};
var stepWhile = noop;

var legalMoves = null;

var legalMovesWithoutDiagonal = [
{x: 0, y: -1},
{x: -1, y: 0},
{x: 1, y: 0},
{x: 0, y: 1}
];

var legalMovesWithDiagonal = legalMovesWithoutDiagonal.concat([
{x: -1, y: -1},
{x: 1, y: -1},
{x: -1, y: 1},
{x: 1, y: 1},
]);

var visited = null;

function dfs(grid, x, y, results, current) {
  current = current || '';
  if (visited[x][y]) {
    throw new Error('already visited grid at ' + x + ',' + y);
  }
  visited[x][y] = true;
  current += grid[x][y];

  // try moving to next position
  var deadEnd = true;
  legalMoves.forEach(function (move) {
    var toX = x + move.x;
    var toY = y + move.y;
    if (inside(grid, toX, toY)) {
      if (!visited[toX][toY]) {
        if (stepWhile(current, toX, toY, grid)) {
          deadEnd = false;
          dfs(grid, toX, toY, results, current);
        }
      }
    }
  });

  if (deadEnd) {
    // console.log('dead end at', x, y, 'current', current);
    results.push(current);
  }

  visited[x][y] = false;
}

/** returns all paths starting from given location */
module.exports.pathsFrom = function (grid, x, y, opts) {
  verify(grid);
  if (!inside(grid, x, y)) {
    throw new Error('invalid starting position ' + x + ',' + y);
  }
  opts = opts || {};
  legalMoves = (opts.simple ? legalMovesWithoutDiagonal :
    legalMovesWithDiagonal);
  stepWhile = opts.stepWhile || noop;

  var results = [];
  visited = [];
  visited.length = grid.length;
  grid.forEach(function (row, index) {
    visited[index] = [];
    visited[index].length = row.length;
  });
  dfs(grid, x, y, results);

  return results;
};