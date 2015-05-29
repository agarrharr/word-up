d3.chart('boggle-down', {
  initialize: function () {
    'use strict';

    var _Chart = this;
    _Chart.height= 600;
    var padding = 10;
    var tileSize = (_Chart.height / 5) - padding;
    var fontSize = tileSize * 0.6;
    var yPos = function(d) { return _Chart.height - tileSize - (d.row * (tileSize + padding)); };
    var xPos = function(d) { return d.column * (tileSize + padding); };
    var isInitialAnimation = true;

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
      
      this.attr('transform', function(d) { 
        return 'translate(' + xPos(d) + ',' + -(tileSize) + ')';
      })
      
      this.append('rect')
        .attr({
          'class': 'tiles',
          'height': tileSize,
          'width': tileSize,
          'rx': 15,
          'ry': 15
        });
            
      this.append('text')
        .attr({
          'class': 'letter',
          'font-size': fontSize,
          'text-anchor': 'middle'
        });  
           
      return this;
    })
    .on('merge', function () {
      
      this
        .transition()
        .delay(function(d) {
          if (isInitialAnimation) { 
            return 100 * d.id;
          }
          else {
            return 0;
          }
         })
        .duration(500)
        .ease('bounce')
        .attr({
          'transform': function(d) { 
            return 'translate(' + xPos(d) + ',' + yPos(d)+ ')';
          }
        });
        
        isInitialAnimation = false;
      
      this.select('rect.tiles')
        .style('fill', function(d) {
          return d.color;
        });
      
      this.select('text.letter')
          .style({
            'fill': '#fff'
          })
          .attr({
            'dy': tileSize * 0.65,
            'dx': tileSize * 0.5
          })
          .text(function(d) { return d.value; });
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

