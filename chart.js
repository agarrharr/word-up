d3.chart('boggle-down', {
  initialize: function () {
    'use strict';

    var _Chart = this;
    _Chart.height= 600;
    var padding = 10;
    var tileSize = (_Chart.height / 5) - padding;
    var yPos = function(d) { return _Chart.height - tileSize - (d.row * (tileSize + padding)); };
    var xPos = function(d) { return d.column * (tileSize + padding); };

    this._layer = this.base.append('g');

    _Chart.layer('bars', this._layer, {
      dataBind: function (data) {
        return this.selectAll('.letterGroup')
          .data(data, function(d) {
            return d.id;
          });
      },
      insert: function () {
        return this.append('g')
	  .classed('letterGroup', true);
      }
    })
    .on('enter', function () {
      this.append('rect')
          .attr({
            'class': 'tiles',
            'height': tileSize,
            'width': tileSize,
            'rx': 15,
            'ry': 15
            })
      return this;
    })
    .on('merge', function () {
      this.style('fill', function(d) {
            return d.color;
          })
          .attr({
            'transform': function(d) { 
              return 'translate(' + xPos(d) + ',' + yPos(d)+ ')';
             }
          })
      return this;
    })
    .on('exit', function () {
      return this.remove();
    });
  },
  
  height: function(value) { 
    this.height = value;
    return this;
  }
});

