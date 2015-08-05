baseUrl = '';

requirejs.config({
    baseUrl: 'src/',
    paths: {
        d3: '../bower_components/d3/d3.min',
        koto: '../node_modules/koto/dist/koto.min'
    }
});
requirejs(['d3', 'game', 'Chart', 'path'], function(d3, game, Chart, path) {
  var padding = 50;
  var strokeWidth = 5;
  var height = 800;
  var width = 600;
  var tileSize = height / 6;
  var tileLargeSpace = tileSize * 0.8;
  var headerHeight = 290;
  var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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

  var chart = new Chart(group);

  game.newGame();
  var data = game.convertData(game.getData());
  chart.height(viewportHeight - headerHeight);
  chart.draw(data);

  setupScores();

  path.isAWordLeft(function(success, word) { console.log(success, word); });

  chart.on('wordCreated', function(d) {
    var word = '';

    for(var i = 0; i < d.length; i += 1) {
      word += d[i].value.toLowerCase();
    }
    game.isAWord(word, function(success) {
      var currentScore;
      if (success) {
        game.removeData(d);
        game.addData();
        currentScore = game.getPointsForWord(word);
        game.addToScore(currentScore);
        game.addToMoves();
        changeScoreOnPage();
        changeHighScoreOnPage();
        changeMovesOnPage();
        chart.draw(game.convertData(game.getData()));

        path.isAWordLeft(function(success, word) { console.log(success, word); });
      }
    });
  });

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
});
