var svg = d3.select('#game')
	.append('svg')
	.attr({
		'height': 600,
		'width': 600
	});

var chart = svg.append("g")
	.chart('boggle-down');

var dice = [
  'A', 'A', 'E', 'E', 'G', 'N',
  'E', 'L', 'R', 'T', 'T', 'Y',
  'A', 'O', 'O', 'T', 'T', 'W',
  'A', 'B', 'B', 'J', 'O', 'O',
  'E', 'H', 'R', 'T', 'V', 'W',
  'C', 'I', 'M', 'O', 'T', 'U',
  'D', 'I', 'S', 'T', 'T', 'Y',
  'E', 'I', 'O', 'S', 'S', 'T',
  'D', 'E', 'L', 'R', 'V', 'Y',
  'A', 'C', 'H', 'O', 'P', 'S',
  'H', 'I', 'M', 'N', 'Qu','U',
  'E', 'E', 'I', 'N', 'S', 'U',
  'E', 'E', 'G', 'H', 'N', 'W',
  'A', 'F', 'F', 'K', 'P', 'S',
  'H', 'L', 'N', 'N', 'R', 'Z',
  'D', 'E', 'I', 'L', 'R', 'X'
];


var data = [];

var numberOfRows = 4;
var extraRows = 2;
var numberOfColumns = 4;
var randomNumber;

var totalRows = numberOfRows + extraRows;
for (var i = 0; i < totalRows * numberOfColumns; i += 1) {
	row = Math.floor(i / numberOfColumns);
	column = i % numberOfColumns;
	randomNumber = Math.floor(Math.random() * dice.length);

	if (column === 0) {
		data.push([]);
	}
	data[row][column] = dice[randomNumber];
}


chart.draw(data);
