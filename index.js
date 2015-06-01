var padding = 50;
var strokeWidth = 5;
var height = 800;
var width = 600;
var tileSize = height / 6;
var tileLargeSpace = tileSize * 0.8;

preventScrollingOnPage();
preventHighlightingLetters();

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
  var word = '';
  if (d.length > 2) {
    game.removeData(d);
    game.addData();
    for(var i = 0; i < d.length; i += 1) {
      word += d[i].value.toLowerCase();
    }
    isAWord(word, function(success) {
      var currentScore;
      if (success) {
        currentScore = getPointsForWord(word);
        game.addToScore(currentScore);
        game.addToMoves();
        changeScoreOnPage();
        changeHighScoreOnPage();
        changeMovesOnPage();
        chart.draw(game.convertData(game.getData()));
      }
    });
  }
});

function isAWord(word, callback) {
  var success = false;
  var letter = word[0];

  d3.csv('assets/eowl/' + letter + '.csv', function(d) {
    for(var i = 0; i < d.length; i += 1) {
      if (word === d[i][letter]) {
        success = true;
        break;
      }
    }
    callback(success);
  });
}

function getPointsForWord(word) {
  var lenth = word.length;
  var points;

  switch(length) {
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

  if (length < 3) {
    points = 0;
  } else if (length > 7) {
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

function preventScrollingOnPage() {
  d3.select(document).node().addEventListener('touchstart', function(e) {
    e.preventDefault();
  });
}

function preventHighlightingLetters() {
  var element = d3.select('#game').node();

  element.onselectstart = function(){ return false; };
  element.onmousedown = function(){ return false; };
}
