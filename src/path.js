define('path',
  ['game'],
  function(game) {
    var numberOfRows = 4;
    var numberOfColumns = 4;
    var callbackCounter = 0;
    var startingPosition;

    var isAWordLeft = function(path, callback) {
      if (path === undefined) {
        path = [[0, 0]];
      }
      startingPosition = path[0];
      if (path.length < 3) {
        return callRecursiveFunctions(path, callback);
      }
      isPathAWord(path, function(success, word) { decrement(success, word, callback); });
    };

    var callRecursiveFunctions = function(path, callback) {
      var currentLocation = path[path.length - 1];
      var newLocation;
      for(var i = -1; i <= 1; i += 1) {
        for(var j = -1; j <= 1; j += 1) {
          newLocation = [currentLocation[0] + i, currentLocation[1] + j];
          if (isNotAlreadyInPath(path, newLocation) && isAValidLocation(newLocation)) {
            path.push(newLocation);
            isAWordLeft(path, callback);
            path.pop();
          }
        }
      }
    };

    var isPathAWord = function(path, callback) {
      callbackCounter += 1;
      var word = '';
      for(var i = 0; i < path.length; i += 1) {
        word += game.getLetterAtLocation({row: path[i][0], column: path[i][1]});
      }
      return game.isAWord(word, function(success) { callback(success, word); });
    };

    var isNotAlreadyInPath = function(path, newLocation) {
      for(var i = 0; i < path.length; i += 1) {
        if (path[i][0] === newLocation[0] && path[i][1] === newLocation[1]) {
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
      if (success && callbackCounter > 0) {
        callback(success, word);
        callbackCounter = -1;
      }
      if (callbackCounter === 0) {
        startFromNextStartingPosition(callback);
      }
    };

    var startFromNextStartingPosition = function(callback) {
      if (startingPosition[0] < numberOfRows - 1) {
        startingPosition[0] += 1;
        isAWordLeft([startingPosition], callback);
        return;
      }
      if (startingPosition[1] < numberOfColumns - 1) {
        startingPosition[0] = 0;
        startingPosition[1] += 1;
        isAWordLeft([startingPosition], callback);
        return;
      }
      callback(false);
    };

    return {
      isAWordLeft: isAWordLeft
    };
  }
);

