d3.chart('boggle-down', {
  initialize: function () {
    'use strict';

    var _Chart = this;

    this._layer = this.base.append('g');

    _Chart.layer('bars', this._layer, {
      dataBind: function (data) {
        return this.selectAll('.letterGroup')
          .data(data);
      },
      insert: function () {
        return this.append('g')
	  .classed('letterGroup', true);
      }
    })
    .on('enter', function () {
      return this;
    })
    .on('merge', function () {
      return this;
    })
    .on('exit', function () {
      return this.remove();
    });
  }
});

