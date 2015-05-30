var game = function() {
  var score = 0;
  var highScore = 19;
  var moves = 0;
  var data = [];
  var rows = 4;
  var nextRows = 2;
  var totalRows = rows + nextRows;
  var columns = 4;
  var highestId = 0;

  var getScore = function() {
    return score;
  };

  var addToScore = function(value) {
    score += value;
    if (score > highScore) {
      highScore = score;
    }
  };

  var getHighScore = function() {
    return highScore;
  };

  var setHighScore = function() {
    return highScore;
  };

  var getMoves = function() {
    return moves;
  };

  var addToMoves = function() {
    moves += 1;
  };

  var newGame = function() {
    score = 0;
    addData();
  };

  var getRandomLetter = function() {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var randomIndex = Math.floor(Math.random() * letters.length);

    return letters[randomIndex];
  };

  var addData = function() {
    var numberOfTiles = columns * (totalRows);
    if (data.length !== numberOfTiles) {
      for(var column = 0; column < columns; column += 1) {
        if (!data[column]) {
          data[column] = [];
        }
        while (data[column].length < totalRows) {
          data[column].push({
            id: highestId,
            value: getRandomLetter(),
            color: getRandomColor()
          });
          highestId += 1;
        }
      }
    }
  };

  var removeData = function(d) {
    var row;
    var column;
    for(var i = 0; i < d.length; i += 1) {
      row = d[i].row;
      column = d[i].column;
      if (data && data[d[i].column] && data[d[i].column][d[i].row]) {
        data[d[i].column].splice(d[i].row, 1);
      }
    }
  };

  var convertData = function(oldData) {
    var newData = [];
    var column;
    var row;
    var newObject;

    for(column in oldData) {
      for(row in oldData[column]) {
        newObject = oldData[column][row];
        if (!newObject) {
          newObject = {};
        }
        newObject.row = parseInt(row);
        newObject.column = parseInt(column);
        newObject = oldData[column][row];
        newData.push(newObject);
      }
    }
    // newData.sort(function(a, b) { return a.column > b.column && a.row > b.row; });

    return newData;
  };

  var getData = function() {
    return data;
  };

  var setData = function(value) {
    data = value;
  };

  var getRandomColor = function(id) {
    var colors = ['#F75168', '#678FC1', '#b5577e', '#1DAD7C', '#F98D3F'];
    var randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  };

  return {
    getScore: getScore,
    addToScore: addToScore,
    getHighScore: getHighScore,
    setHighScore: setHighScore,
    getMoves: getMoves,
    addToMoves: addToMoves,
    newGame: newGame,
    getRandomLetter: getRandomLetter,
    addData: addData,
    removeData: removeData,
    convertData: convertData,
    getData: getData,
    setData: setData,
    getRandomColor: getRandomColor
  };
}();

var padding = 50;
var strokeWidth = 5;
var height = 800;
var width = 600;
var tileSize = height / 6;
var tileLargeSpace = tileSize * 0.8;

var svg = d3.select('#game')
  .append('svg')
  .attr({
    'height': height + padding * 2,
    'width': width + padding * 2
  });

var group = svg.append('g')
  .attr('transform', 'translate(' + strokeWidth + ', ' + -strokeWidth + ')');

var chart = group.chart('word-up');

game.newGame();
var data = game.convertData(game.getData());
chart.draw(data);

setupScores();

chart.on('wordCreated', function(d) {
  game.removeData(d);
  game.addData();
  // var currentScore = getPointsForWord(word);
  var currentScore = getPointsForWord('tip');
  game.addToScore(currentScore);
  changeScoreOnPage();
  game.addToMoves();
  changeMovesOnPage();
  chart.draw(game.convertData(game.getData()));
});


function getPointsForWord(word) {
  var points;

  switch(word.length) {
    case 3:
      points = 1;
      break;
    case 4:
      points = 1;
      break;
    case 5:
      points = 2;
      break;
    case 6:
      points = 3;
      break;
    case 7:
      points = 5;
      break;
  }

  if (word.length < 3) {
    points = 0;
  } else if (word.length > 7) {
    points = 11;
  }

  return points;
}

function changeMovesOnPage() {
  d3.select('#moves').html(game.getMoves());
}

function changeScoreOnPage() {
  d3.select('#score').html(game.getScore());
}

function changeHighScoreOnPage() {
  d3.select('#highScore').html(game.getHighScore());
}

function setupScores() {
  changeScoreOnPage();
  changeHighScoreOnPage();
}
