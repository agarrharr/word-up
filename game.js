var game = function() {
  var isAWord = function(word, callback) {
    var success = false;
    var letter = word[0];

    d3.csv('' + letter + '.csv', function(d) {
      for(var i = 0; i < d.length; i += 1) {
        if (word === d[i][letter]) {
          success = true;
          break;
        }
      }
      callback(success);
    });
  };

  return {
    isAWord: isAWord
  };
}();

