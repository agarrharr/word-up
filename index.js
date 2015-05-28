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
    value: 'A',
    row: 0,
    column: 0,
    color: 'red'
  },
  {
    id: 1,
    value: 'W',
    row: 0,
    column: 1,
    color: 'green'
  },
  {
    id: 2,
    value: 'E',
    row: 0,
    column: 2,
    color: 'orange'
  },
  {
    id: 3,
    value: 'S',
    row: 0,
    column: 3,
    color: 'red'
  },
  {
    id: 4,
    value: 'Qu',
    row: 1,
    column: 0,
    color: 'red'
  },
  {
    id: 5,
    value: 'F',
    row: 1,
    column: 1,
    color: 'red'
  },
  {
    id: 6,
    value: 'T',
    row: 1,
    column: 2,
    color: 'red'
  },
  {
    id: 7,
    value: 'H',
    row: 1,
    column: 3,
    color: 'red'
  },
  {
    id: 8,
    value: 'O',
    row: 2,
    column: 0,
    color: 'red'
  },
  {
    id: 9,
    value: 'N',
    row: 2,
    column: 1,
    color: 'red'
  },
  {
    id: 10,
    value: 'M',
    row: 2,
    column: 2,
    color: 'red'
  },
  {
    id: 11,
    value: 'W',
    row: 2,
    column: 3,
    color: 'red'
  },
  {
    id: 12,
    value: 'I',
    row: 3,
    column: 0,
    color: 'red'
  },
  {
    id: 13,
    value: 'P',
    row: 3,
    column: 1,
    color: 'red'
  },
  {
    id: 14,
    value: 'G',
    row: 3,
    column: 2,
    color: 'red'
  },
  {
    id: 15,
    value: 'H',
    row: 3,
    column: 3,
    color: 'red'
  }
];

chart.draw(data);


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
