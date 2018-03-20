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
        console.log('------');
        console.log('slash array:');
        console.log(this._slashArray);
        this.print();
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
        if (this._slashArray.length === 2) {
          console.log('this._slashArray.length === 2');
          if (this._slashArray[0][0] === this._slashArray[1][0]) {
            if (this._slashArray[0][1] > this._slashArray[1][1]) {
              var thirdRowIndex = this._slashArray[0][0] - 2;
              var thirdColumnIndex = this._slashArray[0][1];
              this._slashArray[2] = [thirdRowIndex, thirdColumnIndex];
              this._mazeGrid[thirdRowIndex][thirdColumnIndex] = '/';
              this._numberOfSlashes++;
              i++;
              console.log(this._slashArray);
            } else if (this._slashArray[0][1] < this._slashArray[1][1]) {
              var _thirdRowIndex = this._slashArray[0][0] + 2;
              var _thirdColumnIndex = this._slashArray[0][1];
              this._slashArray[2] = [_thirdRowIndex, _thirdColumnIndex];
              this._mazeGrid[_thirdRowIndex][_thirdColumnIndex] = '/';
              this._numberOfSlashes++;
              i++;
              console.log(this._slashArray);
            }
          } else if (this._slashArray[0][1] === this._slashArray[1][1]) {
            if (this._slashArray[0][0] > this._slashArray[1][0]) {
              var _thirdRowIndex2 = this._slashArray[0][0];
              var _thirdColumnIndex2 = this._slashArray[0][1] - 2;
              this._slashArray[2] = [_thirdRowIndex2, _thirdColumnIndex2];
              this._mazeGrid[_thirdRowIndex2][_thirdColumnIndex2] = '/';
              this._numberOfSlashes++;
              i++;
              console.log(this._slashArray);
            } else if (this._slashArray[0][0] < this._slashArray[1][0]) {
              var _thirdRowIndex3 = this._slashArray[0][0];
              var _thirdColumnIndex3 = this._slashArray[0][1] + 2;
              this._slashArray[2] = [_thirdRowIndex3, _thirdColumnIndex3];
              this._mazeGrid[_thirdRowIndex3][_thirdColumnIndex3] = '/';
              this._numberOfSlashes++;
              i++;
              console.log(this._slashArray);
            }
          }
          this.print();
        }
        if (this._slashArray.length === 3) {
          if (this._slashArray[0][0] === this._slashArray[2][0]) {
            var fourthRowIndex = this._slashArray[1][0];
            var fourthColumnIndex = this._slashArray[2][1];
            this._slashArray[3] = [fourthRowIndex, fourthColumnIndex];
            this._mazeGrid[fourthRowIndex][fourthColumnIndex] = '/';
            this._numberOfSlashes++;
            i++;
            console.log('------');
            this.print();
            console.log(this._slashArray);
            rowIndex = fourthRowIndex;
            columnIndex = fourthColumnIndex;
          } else if (this._slashArray[0][1] === this._slashArray[2][1]) {
            var _fourthRowIndex = this._slashArray[2][0];
            var _fourthColumnIndex = this._slashArray[1][1];
            this._slashArray[3] = [_fourthRowIndex, _fourthColumnIndex];
            this._mazeGrid[_fourthRowIndex][_fourthColumnIndex] = '/';
            this._numberOfSlashes++;
            i++;
            console.log('------');
            this.print();
            console.log(this._slashArray);
            rowIndex = _fourthRowIndex;
            columnIndex = _fourthColumnIndex;
          }
        }
        if (this._slashArray.length === 4) {
          var randomTurn = 0; // Math.floor(Math.random() * 3);
          if (randomTurn === 0) {
            this._slashArray[4] = [this._slashArray[3][0] - 1, this._slashArray[3][1]];
            this._mazeGrid[this._slashArray[4][0]][this._slashArray[4][1]] = '/';

            this._slashArray[5] = [this._slashArray[1][0], this._slashArray[1][1] - 1];
            this._mazeGrid[this._slashArray[5][0]][this._slashArray[5][1]] = '/';

            this._slashArray[6] = [this._slashArray[5][0], this._slashArray[5][1] - 1];
            this._mazeGrid[this._slashArray[6][0]][this._slashArray[6][1]] = '/';

            this._slashArray[7] = [this._slashArray[6][0] - 1, this._slashArray[6][1]];
            this._mazeGrid[this._slashArray[7][0]][this._slashArray[7][1]] = '/';

            this._slashArray[8] = [this._slashArray[7][0] - 1, this._slashArray[7][1]];
            this._mazeGrid[this._slashArray[8][0]][this._slashArray[8][1]] = '/';

            this._slashArray[9] = [this._slashArray[8][0] - 1, this._slashArray[8][1]];
            this._mazeGrid[this._slashArray[9][0]][this._slashArray[9][1]] = '/';

            this._numberOfSlashes += 6;
            i += 6;
            console.log('------');
            this.print();
            console.log(this._slashArray);
          }
          return;
        }
        console.log('rowIndex: ' + rowIndex);
        console.log('columnIndex: ' + columnIndex);
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