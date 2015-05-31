d3.chart('word-up', {
  initialize: function() {
    'use strict';

    var _Chart = this;

    _Chart.height = 800;

    var padding = 10;
    var rows = 4;
    var initialDelayTime = 100;
    var tileSize = (_Chart.height / 6) - padding;
    var fontSize = tileSize * 0.6;
    var yPos = function(d) {
      if (d.row > 3) {
        return _Chart.height - tileSize - (d.row * (tileSize + padding));
      } else {
        return _Chart.height - tileSize + (tileSize * 0.75) - (d.row * (tileSize + padding));
      }
    };
    var xPos = function(d) {
      return d.column * (tileSize + padding);
    };
    var isInitialAnimation = true;

    var isDragging = false;
    var selectedLetters;
    var selectedLettersIds;

    this._layer = this.base.append('g');

    _Chart.transform = function(data) {
      d3.select('body')
        .on('touchend', function() {
          endSelection();
        });
      d3.select('body')
        .on('mouseup', endSelection);

      return data;
    };

    _Chart.layer('bars', this._layer, {
        dataBind: function(data) {
          return this.selectAll('.letterGroup')
            .data(data, function(d) {
              return d.id;
            });
        },
        insert: function() {
          return this.append('g')
            .classed('letterGroup', true);
        }
      })
      .on('enter', function() {
        this.attr('transform', function(d) {
          return 'translate(' + xPos(d) + ', ' + -(tileSize) + ')';
        });

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
            'class': function(d) {
              return d.value;
            },
            'font-size': fontSize,
            'text-anchor': 'middle'
          });

        var circle = this.append('circle')
          .classed('hover', true)
          .attr({
            'cx': tileSize / 2,
            'cy': tileSize / 2,
            'r': tileSize * 0.3
          })
          .style({
            'opacity': 0
          });
        circle.on('mousedown', startSelection)
          .on('mousemove', updateSelection);
        circle.each(function(d, i) {
          d3.select(this).node().addEventListener('touchstart', startSelectionMobile);
          d3.select(this).node().addEventListener('touchmove', updateSelectionMobile);
        });


        return this;
      })
      .on('merge', function() {
        this.classed('disabled', function(d) {
          return d.row > 3;
        });

        this.transition()
          .delay(function(d) {
            if (isInitialAnimation) {
              return initialDelayTime * ((d.row * rows) + d.column);
            } else {
              return 0;
            }
          })
          .duration(750)
          .ease('bounce')
          .attr({
            'transform': function(d) {
              return 'translate(' + xPos(d) + ', ' + yPos(d) + ')';
            }
          });

        isInitialAnimation = false;

        this.select('rect.tiles')
          .style({
            'fill': function(d) {
              return d.color;
            }
          });

        this.select('text')
          .style({
            'fill': '#fff'
          })
          .attr({
            'dy': tileSize * 0.65,
            'dx': tileSize * 0.5
          })
          .text(function(d) {
            return d.value;
          });
        return this;
      })
      .on('exit', function() {

        this.transition()
          .duration(750)
          .attr({
            'transform': function(d) {
              return 'translate(' + (xPos(d) - tileSize * 0.5) + ',' + (yPos(d) + (tileSize * 1.5)) + '), rotate( 20 )';
            }
          })
          .style('opacity', 0)
          .remove();

        return this;
      });

    function startSelectionMobile(e) {
      var data = d3.select(this).data()[0];
      startSelection.call(this, data);
    }

    function updateSelectionMobile(e) {
      var currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      var data = d3.select(currentElement).data()[0];
      updateSelection.call(currentElement, data);
    }

    function startSelection(d) {
      if (d.row > 3) {
        return;
      }
      selectedLetters = [d];
      selectedLettersIds = [d.id];
      d3.select(this.parentElement).select('rect').classed('selected', true);
      isDragging = true;
    }

    function updateSelection(d) {
      var lastLetter;
      var secondLastLetter;
      var itsNotSelected;
      var itsThePreviousTile;
      var itsAdjacent;
      if (d.row > 3) {
        return;
      }
      if (isDragging) {
        lastLetter = selectedLetters[selectedLetters.length - 1];
        if (selectedLetters.length > 1) {
          secondLastLetter = selectedLetters[selectedLetters.length - 2];
        }
        itsNotSelected = selectedLettersIds.indexOf(d.id) === -1;
        itsThePreviousTile = secondLastLetter && secondLastLetter.id === d.id;
        itsAdjacent = Math.abs(d.row - lastLetter.row) <= 1 && Math.abs(d.column - lastLetter.column) <= 1;
        if ((itsNotSelected && itsAdjacent) || itsThePreviousTile) {
          if(secondLastLetter && secondLastLetter.id === d.id) {
            selectedLetters.pop();
            selectedLettersIds.pop();
            d3.select(this.parentElement.parentElement).selectAll('rect')
              .filter(function(datum) {
                return lastLetter.id === datum.id;
              })
              .classed('selected', false);
          } else{
            selectedLetters.push(d);
            selectedLettersIds.push(d.id);
            d3.select(this.parentElement).select('rect').classed('selected', true);
          }
        }
      }
    }

    function endSelection() {
      if (isDragging) {
        isDragging = false;
        d3.selectAll('rect').classed('selected', false);
        _Chart.trigger('wordCreated', selectedLetters);
      }
    }
  },

  height: function(value) {
    this.height = value;
    return this;
  }
});
