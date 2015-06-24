define('path',
  ['game'],
  function(game) {
    var numberOfRows = 4;
    var numberOfColumns = 4;
    var callbackCounter = 0;

    var isAWordLeft = function(trail, callback) {
      if (trail === undefined) {
        trail = [[0, 0]];
      }
      if (trail.length < 3) {
        return callRecursiveFunctions(trail, callback);
      }
      isPathAWord(trail, function(success, word) { decrement(success, word, callback); });
    };

    var callRecursiveFunctions = function(trail, callback) {
      var currentLocation = trail[trail.length - 1];
      var newLocation;
      for(var i = -1; i <= 1; i += 1) {
        for(var j = -1; j <= 1; j += 1) {
          newLocation = [currentLocation[0] + i, currentLocation[1] + j];
          if (isNotAlreadyInPath(trail, newLocation) && isAValidLocation(newLocation)) {
            trail.push(newLocation);
            isAWordLeft(trail, callback);
            trail.pop();
          }
        }
      }
    };

    var isPathAWord = function(trail, callback) {
      callbackCounter += 1;
      console.log(callbackCounter);
      var word = '';
      for(var i = 0; i < trail.length; i += 1) {
        word += game.getLetterAtLocation({row: trail[i][0], column: trail[i][1]});
      }
      console.log(word);
      return game.isAWord(word, function(success) { callback(success, word); });
    };

    var isNotAlreadyInPath = function(trail, newLocation) {
      for(var i = 0; i < trail.length; i += 1) {
        if (trail[i][0] === newLocation[0] && trail[i][1] === newLocation[1]) {
          return false;
        }
      }
      return true;
    };

    var isAValidLocation = function(newLocation) {
      if (newLocation[0] < 0 || newLocation[1] < 0) {
         return false;
      }
      if (newLocation[0] > numberOfRows || newLocation[1] > numberOfColumns) {
         return false;
      }
      return true;
    };

    var decrement = function(success, word, callback) {
      callbackCounter -= 1;
      console.log(callbackCounter);
      if (callbackCounter === 0) {
        callback(success, word);
      }
    };

    return {
      isAWordLeft: isAWordLeft
    };
  }
);

