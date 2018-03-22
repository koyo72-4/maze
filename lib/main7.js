'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze() {
    _classCallCheck(this, Maze);

    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
    this._cache = {};
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
      this._slashArray[i] = [rowIndex, columnIndex];
      this._mazeGrid[rowIndex][columnIndex] = '/';
      console.log('------');
      console.log('slash array:');
      console.log(this._slashArray);
      this.print();
    }
  }, {
    key: 'randomSlashes',
    value: function randomSlashes(i, rowIndex, columnIndex) {
      while (i < 200) {
        this.arraySlashes(i, rowIndex, columnIndex);
        if (!this._cache[0]) {
          var randomLeft = Math.floor(Math.random() * 2);
          console.log(this._cache);
          if (randomLeft === 0) {
            this._cache.left = this._slashArray[i];
            console.log(this._cache.left[0]);
            i++;
            this.arraySlashes(i, rowIndex + 2, columnIndex);
            this._cache.right = this._slashArray[i];
            console.log(this._cache);
          } else if (randomLeft === 1) {
            this._cache.right = this._slashArray[i];
            console.log(this._cache.right[0]);
            i++;
            this.arraySlashes(i, rowIndex - 2, columnIndex);
            this._cache.left = this._slashArray[i];
            console.log(this._cache);
          }
          i++;
        }
        var randomTurn = Math.floor(Math.random() * 3);
        if (randomTurn === 0) {
          if (this._cache.left[0] < this._cache.right[0]) {
            rowIndex = this._cache.left[0];
            columnIndex = this._cache.left[1] + 1;
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            columnIndex = this._cache.right[1] + 1;
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          } else {
            return;
          }
        } else if (randomTurn === 1) {
          var a = void 0;
          var b = void 0;
          var c = void 0;
          var d = void 0;
          if (this._cache.left[0] < this._cache.right[0]) {
            a = -1;
            b = 0;
            c = 1;
            d = 2;

            rowIndex = this._cache.left[0] + a;
            columnIndex = this._cache.left[1] + b;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.right[0] + b;
            columnIndex = this._cache.right[1] + c;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            columnIndex = this._cache.right[1] + d;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.left[0] + c;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.left[0] + b;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.left[0] + a;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            this._cache.left = this._slashArray[i - 6];
            this._cache.right = this._slashArray[i - 1];
            console.log('cache:');
            console.log(this._cache);

            return;
          } else {
            return;
          }
        } else if (randomTurn === 2) {
          var _a = void 0;
          var _b = void 0;
          var _c = void 0;
          if (this._cache.left[0] < this._cache.right[0]) {
            _a = 1;
            _b = 0;
            _c = 2;

            rowIndex = this._cache.right[0] + _a;
            columnIndex = this._cache.right[1] + _b;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.left[0] + _b;
            columnIndex = this._cache.left[1] + _a;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            columnIndex = this._cache.left[1] + _c;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.left[0] + _a;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.right[0] + _b;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            rowIndex = this._cache.right[0] + _a;
            this.arraySlashes(i, rowIndex, columnIndex);
            i++;

            this._cache.right = this._slashArray[i - 6];
            this._cache.left = this._slashArray[i - 1];
            console.log('cache:');
            console.log(this._cache);

            return;
          } else {
            return;
          }
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
maze.randomSlashes(0, 4, 0);