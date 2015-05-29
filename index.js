var score = 0;
var highScore = 19;

var svg = d3.select('#game')
	.append('svg')
	.attr({
		'height': 600,
		'width': 600
	});

var chart = svg.append("g")
	.chart('boggle-down');

var data = [
  {
    id: 0,
    value: 'W',
    row: 0,
    column: 0,
    color: getRandomColor()
  },
  {
    id: 1,
    value: 'O',
    row: 0,
    column: 1,
    color: getRandomColor()
  },
  {
    id: 2,
    value: 'T',
    row: 0,
    column: 2,
    color: getRandomColor()
  },
  {
    id: 3,
    value: 'Qu',
    row: 0,
    column: 3,
    color: getRandomColor()
  },
  {
    id: 4,
    value: 'L',
    row: 1,
    column: 0,
    color: getRandomColor()
  },
  {
    id: 5,
    value: 'S',
    row: 1,
    column: 1,
    color: getRandomColor()
  },
  {
    id: 6,
    value: 'R',
    row: 1,
    column: 2,
    color: getRandomColor()
  },
  {
    id: 7,
    value: 'A',
    row: 1,
    column: 3,
    color: getRandomColor()
  },
  {
    id: 8,
    value: 'Y',
    row: 2,
    column: 0,
    color: getRandomColor()
  },
  {
    id: 9,
    value: 'E',
    row: 2,
    column: 1,
    color: getRandomColor()
  },
  {
    id: 10,
    value: 'C',
    row: 2,
    column: 2,
    color: getRandomColor()
  },
  {
    id: 11,
    value: 'V',
    row: 2,
    column: 3,
    color: getRandomColor()
  },
  {
    id: 12,
    value: 'T',
    row: 3,
    column: 0,
    color: getRandomColor()
  },
  {
    id: 13,
    value: 'I',
    row: 3,
    column: 1,
    color: getRandomColor()
  },
  {
    id: 14,
    value: 'P',
    row: 3,
    column: 2,
    color: getRandomColor()
  },
  {
    id: 15,
    value: 'E',
    row: 3,
    column: 3,
    color: getRandomColor()
  }
];

chart.draw(data);

setupScores();

chart.on('wordCreated', function(word, data) {
  var currentScore = getPointsForWord(word);
  addToScore(currentScore);
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

function getRandomColor() {
  var colors = ['#F75168', '#678FC1', '#b5577e', '#1DAD7C', '#F98D3F'];
  var randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}

function addToScore(newScore) {
  score += newScore;
  d3.select('#score').html(score);
}

function addToHighScore(newScore) {
  highScore += newScore;
  d3.select('#highScore').html(highScore);
}

function setupScores() {
  d3.select('#score').html(score);
  d3.select('#highScore').html(highScore);
}
