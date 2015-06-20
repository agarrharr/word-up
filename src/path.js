define('path',
  [],
  function() {
    var getPaths = function(depth, startingPositions) {
      return [
          [
              [
                  {x: 0, y:0},
                  {x: 1, y:0}
              ],
              [
                  {x: 0, y:0},
                  {x: 1, y:1}
              ],
              [
                  {x: 0, y:0},
                  {x: 0, y:1}
              ]
          ],
          [
              [
                  {x: 1, y:0},
                  {x: 1, y:1}
              ],
              [
                  {x: 1, y:0},
                  {x: 0, y:1}
              ],
              [
                  {x: 1, y:0},
                  {x: 0, y:0}
              ]
          ],
          [
              [
                  {x: 0, y:1},
                  {x: 1, y:1}
              ],
              [
                  {x: 0, y:1},
                  {x: 0, y:0}
              ],
              [
                  {x: 0, y:1},
                  {x: 1, y:0}
              ]
          ],
          [
              [
                  {x: 1, y:1},
                  {x: 0, y:1}
              ],
              [
                  {x: 1, y:1},
                  {x: 0, y:0}
              ],
              [
                  {x: 1, y:1},
                  {x: 1, y:0}
              ]
          ]
      ];
    };


    return {
      getPaths: getPaths
    };
  }
);

