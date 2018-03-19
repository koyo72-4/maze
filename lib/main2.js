'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze() {
    _classCallCheck(this, Maze);

    this._mazeGrid = Maze.generateMaze();
    this._numberOfSlashes = 0;
    this._slashArray = [];
  }

  _createClass(Maze, [{
    key: 'print',
    value: function print() {
      console.log(this._mazeGrid.map(function (row) {
        return row.join('  ');
      }).join('\n'));
    }
  }, {
    key: 'arraySlashes',
    value: function arraySlashes(i, rowIndex, columnIndex) {
      if (!this._slashArray[i]) {
        this._slashArray[i] = [rowIndex, columnIndex];
        console.log('slash array:');
        console.log(this._slashArray);
      }
    }
  }, {
    key: 'randomSlashes',
    value: function randomSlashes(i, rowIndex, columnIndex) {
      var _this = this;

      while (this._numberOfSlashes < 200) {
        if (this._numberOfSlashes === 0) {
          this._mazeGrid[rowIndex][columnIndex] = '/';
          this._numberOfSlashes++;
          this.arraySlashes(0, rowIndex, columnIndex);
          i++;
          this.print();
          console.log('------');
        }
        if (this._slashArray.length >= 2) {
          return console.log('this._slashArray.length >= 2');
        }
        var gridOffsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        var freeSpaces = gridOffsets.filter(function (offset) {
          var freeRow = rowIndex + offset[0];
          var freeColumn = columnIndex + offset[1];
          if (freeRow >= 0 && freeRow < 10 && freeColumn >= 0 && freeColumn < 10) {
            return _this._mazeGrid[rowIndex + offset[0]][columnIndex + offset[1]] === 'o';
          }
        });
        console.log('freeSpaces:');
        console.log(freeSpaces);
        var frees = freeSpaces.map(function (offset) {
          offset[0] += rowIndex;
          offset[1] += columnIndex;
          return offset;
        });
        console.log('frees:');
        console.log(frees);
        if (frees[0]) {
          console.log(true);
          var nextSlashOffset = Math.floor(Math.random() * frees.length);
          console.log('nextSlashOffset: ' + nextSlashOffset);
          var newRowIndex = frees[nextSlashOffset][0];
          var newColumnIndex = frees[nextSlashOffset][1];
          if (this._mazeGrid[newRowIndex][newColumnIndex] === 'o') {
            this._mazeGrid[newRowIndex][newColumnIndex] = '/';
            this._numberOfSlashes++;
            this.arraySlashes(i, newRowIndex, newColumnIndex);
            i++;
            this.print();
            console.log('-----');
            console.log('newRowIndex: ' + newRowIndex);
            console.log('newColumnIndex: ' + newColumnIndex);
            return this.randomSlashes(i, newRowIndex, newColumnIndex);
          }
        } else {
          console.log(false);
          return;
        }
      }
    }
  }], [{
    key: 'generateMaze',
    value: function generateMaze() {
      var grid = [];
      for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
          row.push('o');
        }
        grid.push(row);
      }
      return grid;
    }
  }]);

  return Maze;
}();

var maze = new Maze();
console.log(maze._mazeGrid);
maze.print();
maze.randomSlashes(0, 4, 4);