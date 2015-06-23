define('path',
  ['game'],
  function(game) {
    var numberOfRows = 4;
    var numberOfColumns = 4;

    var isAWordLeft = function(path, newLocation) {
      if (path === undefined) {
        path = [[0, 0]];
      }
      if (newLocation !== undefined) {
        if (newLocation.length === 0) {
          return false;
        }
        path.push(newLocation);
      }
      if (path.length < 3) {
        return callRecursiveFunctions(path);
      }
      if (isPathAWord(path)) {
        return true;
      }
      if (isPathAPrefix(path)) {
        return callRecursiveFunctions(path);
      }
      return false;
    };

    var callRecursiveFunctions = function(path) {
      var currentLocation = path[path.length - 1];
      var newLocation;
      var paths = [];
      for(var i = -1; i <= 1; i += 1) {
        for(var j = -1; j <= 1; j += 1) {
          newLocation = [currentLocation[0] + i, currentLocation[1] + j];
          if (isNotAlreadyInPath(path, newLocation) && isAValidLocation(newLocation)) {
            paths.push(newLocation);
          } else {
            paths.push([]);
          }
        }
      }
      return isAWordLeft(path, paths[0]) || isAWordLeft(path, paths[1]) || isAWordLeft(path, paths[2]) ||
        isAWordLeft(path, paths[3]) || isAWordLeft(path, paths[4]) || isAWordLeft(path, paths[5]) ||
        isAWordLeft(path, paths[6]) || isAWordLeft(path, paths[7]) || isAWordLeft(path, paths[8]);
    };

    var isPathAWord = function(path) {
      var word = '';
      for(var i = 0; i < path.length; i += 1) {
        word += game.getLetterAtLocation({row: path[i][0], column: path[i][1]});
      }
      return game.isAWord(word);
    };

    var isPathAPrefix = function(path) {
      var word = '';
      for(var i = 0; i < path.length; i += 1) {
        word += game.getLetterAtLocation({row: path[i][0], column: path[i][1]});
      }
      return game.isAPrefix(word);
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

    return {
      isAWordLeft: isAWordLeft
    };
  }
);

