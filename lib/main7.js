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
      if (i >= 100) {
        return;
      }
      if (!this._cache.left) {
        console.log('first time');
        this.arraySlashes(i, rowIndex, columnIndex);
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
      console.log('randomTurn: ' + randomTurn);
      var valuesArray = [];
      var emptyArray = [];

      if (this._cache.left[0] < this._cache.right[0]) {
        console.log('this._cache.left[0] < this._cache.right[0]');
        if (this._cache.left[0] < this._cache.right[0] && this._cache.left[1] >= this._mazeGrid[0].length - 2) {
          randomTurn = 0;
          console.log('edge: can only go straight');
          console.log('randomTurn: straight: ' + randomTurn);
          rowIndex = this._cache.left[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1] + 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1] + 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
          this.print();
          return;
        } else if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] >= this._mazeGrid.length - 3) {
          console.log('edge: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -1, this._cache.left[1] + 1], [this._cache.left[0] + -1, this._cache.left[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var k = 0; k < valuesArray.length; k++) {
            for (var l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            this.print();
            return;
          }
          valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0], this._cache.left[1] + 2], [this._cache.left[0] + 1, this._cache.left[1] + 2], [this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0], this._cache.right[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k = 0; _k < valuesArray.length; _k++) {
              if (slash[0] === valuesArray[_k][0] && slash[1] === valuesArray[_k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k2 = 0; _k2 < valuesArray.length; _k2++) {
            for (var _l = 0; _l < this._slashArray.length; _l++) {
              if (valuesArray[_k2] === this._slashArray[_l]) {
                emptyArray.push(valuesArray[_k2]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            this.print();
            return;
          }
        } else if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] === 0) {
          console.log('edge: no left turn');
          while (randomTurn === 1) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 1, this._cache.right[1] + 1], [this._cache.right[0] + 1, this._cache.right[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k3 = 0; _k3 < valuesArray.length; _k3++) {
              if (slash[0] === valuesArray[_k3][0] && slash[1] === valuesArray[_k3][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k3]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k4 = 0; _k4 < valuesArray.length; _k4++) {
            for (var _l2 = 0; _l2 < this._slashArray.length; _l2++) {
              if (valuesArray[_k4] === this._slashArray[_l2]) {
                emptyArray.push(valuesArray[_k4]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no right turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            this.print();
            return;
          }
          valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0], this._cache.left[1] + 2], [this._cache.left[0] + 1, this._cache.left[1] + 2], [this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0], this._cache.right[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k5 = 0; _k5 < valuesArray.length; _k5++) {
              if (slash[0] === valuesArray[_k5][0] && slash[1] === valuesArray[_k5][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k5]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k6 = 0; _k6 < valuesArray.length; _k6++) {
            for (var _l3 = 0; _l3 < this._slashArray.length; _l3++) {
              if (valuesArray[_k6] === this._slashArray[_l3]) {
                emptyArray.push(valuesArray[_k6]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            this.print();
            return;
          }
        } else {
          console.log('else, check for nearby slashes');
          valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0], this._cache.left[1] + 2], [this._cache.left[0] + 1, this._cache.left[1] + 2], [this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0], this._cache.right[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k7 = 0; _k7 < valuesArray.length; _k7++) {
              if (slash[0] === valuesArray[_k7][0] && slash[1] === valuesArray[_k7][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k7]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k8 = 0; _k8 < valuesArray.length; _k8++) {
            for (var _l4 = 0; _l4 < this._slashArray.length; _l4++) {
              if (valuesArray[_k8] === this._slashArray[_l4]) {
                emptyArray.push(valuesArray[_k8]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] + 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            this.print();
            return;
          }
          console.log('slashes do NOT say 0');
          valuesArray = [[this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 1, this._cache.right[1] + 1], [this._cache.right[0] + 1, this._cache.right[1] + 2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k9 = 0; _k9 < valuesArray.length; _k9++) {
              if (slash[0] === valuesArray[_k9][0] && slash[1] === valuesArray[_k9][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k9]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k10 = 0; _k10 < valuesArray.length; _k10++) {
            for (var _l5 = 0; _l5 < this._slashArray.length; _l5++) {
              if (valuesArray[_k10] === this._slashArray[_l5]) {
                emptyArray.push(valuesArray[_k10]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            console.log('slashes: no right turn');
            while (randomTurn === 2) {
              randomTurn = Math.floor(Math.random() * 3);
            }
            valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -1, this._cache.left[1] + 1], [this._cache.left[0] + -1, this._cache.left[1] + 2]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k11 = 0; _k11 < valuesArray.length; _k11++) {
                if (slash[0] === valuesArray[_k11][0] && slash[1] === valuesArray[_k11][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k11]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k12 = 0; _k12 < valuesArray.length; _k12++) {
              for (var _l6 = 0; _l6 < this._slashArray.length; _l6++) {
                if (valuesArray[_k12] === this._slashArray[_l6]) {
                  emptyArray.push(valuesArray[_k12]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              randomTurn = 0;
              console.log('slashes disagree with other slashes - no left turn');
              console.log('randomTurn: straight: ' + randomTurn);
              rowIndex = this._cache.left[0];
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.left[1] + 1;
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.left = this._slashArray[i];
              i++;
              rowIndex = this._cache.right[0];
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.right[1] + 1;
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.right = this._slashArray[i];
              i++;
              console.log('slash array:');
              console.log(this._slashArray);
              console.log('cache:');
              console.log(this._cache);
              this.print();
              return;
            }
            console.log('slashes do NOT say no Right turn');
          } else {
            valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -1, this._cache.left[1] + 1], [this._cache.left[0] + -1, this._cache.left[1] + 2]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k13 = 0; _k13 < valuesArray.length; _k13++) {
                if (slash[0] === valuesArray[_k13][0] && slash[1] === valuesArray[_k13][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k13]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k14 = 0; _k14 < valuesArray.length; _k14++) {
              for (var _l7 = 0; _l7 < this._slashArray.length; _l7++) {
                if (valuesArray[_k14] === this._slashArray[_l7]) {
                  emptyArray.push(valuesArray[_k14]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              console.log('slashes: no left turn');
              while (randomTurn === 1) {
                randomTurn = Math.floor(Math.random() * 3);
              }
            }
          }
          console.log('slashes do NOT say no Left turn');
        }
        console.log('randomTurn: ' + randomTurn);
      } else if (this._cache.left[0] > this._cache.right[0]) {
        console.log('this._cache.left[0] > this._cache.right[0]');
        if (this._cache.left[0] > this._cache.right[0] && this._cache.left[1] === 1) {
          randomTurn = 0;
          console.log('edge: can only go straight');
          console.log('randomTurn: straight: ' + randomTurn);
          rowIndex = this._cache.left[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1] - 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1] - 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
          return;
        } else if (this._cache.left[0] > this._cache.right[0] && this._cache.right[0] <= 1) {
          console.log('edge: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 1, this._cache.left[1] + -1], [this._cache.left[0] + 1, this._cache.left[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k15 = 0; _k15 < valuesArray.length; _k15++) {
              if (slash[0] === valuesArray[_k15][0] && slash[1] === valuesArray[_k15][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k15]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k16 = 0; _k16 < valuesArray.length; _k16++) {
            for (var _l8 = 0; _l8 < this._slashArray.length; _l8++) {
              if (valuesArray[_k16] === this._slashArray[_l8]) {
                emptyArray.push(valuesArray[_k16]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0], this._cache.left[1] + -2], [this._cache.right[0] + 1, this._cache.right[1] + -2], [this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0], this._cache.left[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k17 = 0; _k17 < valuesArray.length; _k17++) {
              if (slash[0] === valuesArray[_k17][0] && slash[1] === valuesArray[_k17][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k17]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k18 = 0; _k18 < valuesArray.length; _k18++) {
            for (var _l9 = 0; _l9 < this._slashArray.length; _l9++) {
              if (valuesArray[_k18] === this._slashArray[_l9]) {
                emptyArray.push(valuesArray[_k18]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else if (this._cache.left[0] > this._cache.right[0] && this._cache.left[0] >= this._mazeGrid.length - 1) {
          console.log('edge: no left turn');
          while (randomTurn === 1) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -1, this._cache.right[1] + -1], [this._cache.right[0] + -1, this._cache.right[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k19 = 0; _k19 < valuesArray.length; _k19++) {
              if (slash[0] === valuesArray[_k19][0] && slash[1] === valuesArray[_k19][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k19]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k20 = 0; _k20 < valuesArray.length; _k20++) {
            for (var _l10 = 0; _l10 < this._slashArray.length; _l10++) {
              if (valuesArray[_k20] === this._slashArray[_l10]) {
                emptyArray.push(valuesArray[_k20]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no right turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0], this._cache.left[1] + -2], [this._cache.right[0] + 1, this._cache.right[1] + -2], [this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0], this._cache.left[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k21 = 0; _k21 < valuesArray.length; _k21++) {
              if (slash[0] === valuesArray[_k21][0] && slash[1] === valuesArray[_k21][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k21]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k22 = 0; _k22 < valuesArray.length; _k22++) {
            for (var _l11 = 0; _l11 < this._slashArray.length; _l11++) {
              if (valuesArray[_k22] === this._slashArray[_l11]) {
                emptyArray.push(valuesArray[_k22]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else {
          console.log('else, check for nearby slashes');
          valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0], this._cache.left[1] + -2], [this._cache.right[0] + 1, this._cache.right[1] + -2], [this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0], this._cache.left[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k23 = 0; _k23 < valuesArray.length; _k23++) {
              if (slash[0] === valuesArray[_k23][0] && slash[1] === valuesArray[_k23][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k23]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k24 = 0; _k24 < valuesArray.length; _k24++) {
            for (var _l12 = 0; _l12 < this._slashArray.length; _l12++) {
              if (valuesArray[_k24] === this._slashArray[_l12]) {
                emptyArray.push(valuesArray[_k24]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0];
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1] - 1;
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -1, this._cache.right[1] + -1], [this._cache.right[0] + -1, this._cache.right[1] + -2]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k25 = 0; _k25 < valuesArray.length; _k25++) {
              if (slash[0] === valuesArray[_k25][0] && slash[1] === valuesArray[_k25][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k25]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k26 = 0; _k26 < valuesArray.length; _k26++) {
            for (var _l13 = 0; _l13 < this._slashArray.length; _l13++) {
              if (valuesArray[_k26] === this._slashArray[_l13]) {
                emptyArray.push(valuesArray[_k26]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            console.log('slashes: no right turn');
            while (randomTurn === 2) {
              randomTurn = Math.floor(Math.random() * 3);
            }
            valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 1, this._cache.left[1] + -1], [this._cache.left[0] + 1, this._cache.left[1] + -2]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k27 = 0; _k27 < valuesArray.length; _k27++) {
                if (slash[0] === valuesArray[_k27][0] && slash[1] === valuesArray[_k27][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k27]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k28 = 0; _k28 < valuesArray.length; _k28++) {
              for (var _l14 = 0; _l14 < this._slashArray.length; _l14++) {
                if (valuesArray[_k28] === this._slashArray[_l14]) {
                  emptyArray.push(valuesArray[_k28]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              randomTurn = 0;
              console.log('slashes disagree with other slashes - no left turn');
              console.log('randomTurn: straight: ' + randomTurn);
              rowIndex = this._cache.left[0];
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.left[1] - 1;
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.left = this._slashArray[i];
              i++;
              rowIndex = this._cache.right[0];
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.right[1] - 1;
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.right = this._slashArray[i];
              i++;
              console.log('slash array:');
              console.log(this._slashArray);
              console.log('cache:');
              console.log(this._cache);
              return;
            }
          } else {
            valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 1, this._cache.left[1] + -1], [this._cache.left[0] + 1, this._cache.left[1] + -2]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k29 = 0; _k29 < valuesArray.length; _k29++) {
                if (slash[0] === valuesArray[_k29][0] && slash[1] === valuesArray[_k29][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k29]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k30 = 0; _k30 < valuesArray.length; _k30++) {
              for (var _l15 = 0; _l15 < this._slashArray.length; _l15++) {
                if (valuesArray[_k30] === this._slashArray[_l15]) {
                  emptyArray.push(valuesArray[_k30]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              console.log('slashes: no left turn');
              while (randomTurn === 1) {
                randomTurn = Math.floor(Math.random() * 3);
              }
            }
          }
        }
        console.log('still there?');
      } else if (this._cache.left[1] < this._cache.right[1]) {
        console.log('this._cache.left[1] < this._cache.right[1]');
        if (this._cache.left[1] < this._cache.right[1] && this._cache.left[0] === 1) {
          randomTurn = 0;
          console.log('edge: can only go straight');
          console.log('randomTurn: straight: ' + randomTurn);
          rowIndex = this._cache.left[0] - 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0] - 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
          return;
        } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] >= this._mazeGrid.length - 3) {
          console.log('edge: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0] + -1, this._cache.left[1] + -1], [this._cache.left[0] + -2, this._cache.left[1] + -1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k31 = 0; _k31 < valuesArray.length; _k31++) {
              if (slash[0] === valuesArray[_k31][0] && slash[1] === valuesArray[_k31][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k31]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k32 = 0; _k32 < valuesArray.length; _k32++) {
            for (var _l16 = 0; _l16 < this._slashArray.length; _l16++) {
              if (valuesArray[_k32] === this._slashArray[_l16]) {
                emptyArray.push(valuesArray[_k32]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1] + 1], [this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k33 = 0; _k33 < valuesArray.length; _k33++) {
              if (slash[0] === valuesArray[_k33][0] && slash[1] === valuesArray[_k33][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k33]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k34 = 0; _k34 < valuesArray.length; _k34++) {
            for (var _l17 = 0; _l17 < this._slashArray.length; _l17++) {
              if (valuesArray[_k34] === this._slashArray[_l17]) {
                emptyArray.push(valuesArray[_k34]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] === 0) {
          console.log('edge: no left turn');
          while (randomTurn === 1) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0] + -1, this._cache.right[1] + 1], [this._cache.right[0] + -2, this._cache.right[1] + 1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k35 = 0; _k35 < valuesArray.length; _k35++) {
              if (slash[0] === valuesArray[_k35][0] && slash[1] === valuesArray[_k35][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k35]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k36 = 0; _k36 < valuesArray.length; _k36++) {
            for (var _l18 = 0; _l18 < this._slashArray.length; _l18++) {
              if (valuesArray[_k36] === this._slashArray[_l18]) {
                emptyArray.push(valuesArray[_k36]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no right turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1] + 1], [this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k37 = 0; _k37 < valuesArray.length; _k37++) {
              if (slash[0] === valuesArray[_k37][0] && slash[1] === valuesArray[_k37][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k37]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k38 = 0; _k38 < valuesArray.length; _k38++) {
            for (var _l19 = 0; _l19 < this._slashArray.length; _l19++) {
              if (valuesArray[_k38] === this._slashArray[_l19]) {
                emptyArray.push(valuesArray[_k38]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else {
          console.log('else, check for nearby slashes');
          valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1] + 1], [this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k39 = 0; _k39 < valuesArray.length; _k39++) {
              if (slash[0] === valuesArray[_k39][0] && slash[1] === valuesArray[_k39][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k39]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k40 = 0; _k40 < valuesArray.length; _k40++) {
            for (var _l20 = 0; _l20 < this._slashArray.length; _l20++) {
              if (valuesArray[_k40] === this._slashArray[_l20]) {
                emptyArray.push(valuesArray[_k40]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] - 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0] + -1, this._cache.right[1] + 1], [this._cache.right[0] + -2, this._cache.right[1] + 1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k41 = 0; _k41 < valuesArray.length; _k41++) {
              if (slash[0] === valuesArray[_k41][0] && slash[1] === valuesArray[_k41][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k41]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k42 = 0; _k42 < valuesArray.length; _k42++) {
            for (var _l21 = 0; _l21 < this._slashArray.length; _l21++) {
              if (valuesArray[_k42] === this._slashArray[_l21]) {
                emptyArray.push(valuesArray[_k42]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            console.log('slashes: no right turn');
            while (randomTurn === 2) {
              randomTurn = Math.floor(Math.random() * 3);
            }
            valuesArray = [[this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0] + -1, this._cache.left[1] + -1], [this._cache.left[0] + -2, this._cache.left[1] + -1]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k43 = 0; _k43 < valuesArray.length; _k43++) {
                if (slash[0] === valuesArray[_k43][0] && slash[1] === valuesArray[_k43][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k43]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k44 = 0; _k44 < valuesArray.length; _k44++) {
              for (var _l22 = 0; _l22 < this._slashArray.length; _l22++) {
                if (valuesArray[_k44] === this._slashArray[_l22]) {
                  emptyArray.push(valuesArray[_k44]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              randomTurn = 0;
              console.log('slashes disagree with other slashes - no left turn');
              console.log('randomTurn: straight: ' + randomTurn);
              rowIndex = this._cache.left[0] - 1;
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.left[1];
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.left = this._slashArray[i];
              i++;
              rowIndex = this._cache.right[0] - 1;
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.right[1];
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.right = this._slashArray[i];
              i++;
              console.log('slash array:');
              console.log(this._slashArray);
              console.log('cache:');
              console.log(this._cache);
              return;
            }
          } else {
            valuesArray = [[this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0] + -1, this._cache.left[1] + -1], [this._cache.left[0] + -2, this._cache.left[1] + -1]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k45 = 0; _k45 < valuesArray.length; _k45++) {
                if (slash[0] === valuesArray[_k45][0] && slash[1] === valuesArray[_k45][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k45]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k46 = 0; _k46 < valuesArray.length; _k46++) {
              for (var _l23 = 0; _l23 < this._slashArray.length; _l23++) {
                if (valuesArray[_k46] === this._slashArray[_l23]) {
                  emptyArray.push(valuesArray[_k46]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              console.log('slashes: no left turn');
              while (randomTurn === 1) {
                randomTurn = Math.floor(Math.random() * 3);
              }
            }
          }
        }
        console.log('still there?');
      } else if (this._cache.left[1] > this._cache.right[1]) {
        console.log('this._cache.left[1] > this._cache.right[1]');
        if (this._cache.left[1] > this._cache.right[1] && this._cache.left[0] >= this._mazeGrid.length - 2) {
          randomTurn = 0;
          console.log('edge: can only go straight');
          console.log('randomTurn: straight: ' + randomTurn);
          rowIndex = this._cache.left[0] + 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0] + 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
          return;
        } else if (this._cache.left[1] > this._cache.right[1] && this._cache.right[1] <= 2) {
          console.log('edge: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0] + 1, this._cache.left[1] + 1], [this._cache.left[0] + 2, this._cache.left[1] + 1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k47 = 0; _k47 < valuesArray.length; _k47++) {
              if (slash[0] === valuesArray[_k47][0] && slash[1] === valuesArray[_k47][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k47]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k48 = 0; _k48 < valuesArray.length; _k48++) {
            for (var _l24 = 0; _l24 < this._slashArray.length; _l24++) {
              if (valuesArray[_k48] === this._slashArray[_l24]) {
                emptyArray.push(valuesArray[_k48]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1] + -1], [this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k49 = 0; _k49 < valuesArray.length; _k49++) {
              if (slash[0] === valuesArray[_k49][0] && slash[1] === valuesArray[_k49][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k49]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k50 = 0; _k50 < valuesArray.length; _k50++) {
            for (var _l25 = 0; _l25 < this._slashArray.length; _l25++) {
              if (valuesArray[_k50] === this._slashArray[_l25]) {
                emptyArray.push(valuesArray[_k50]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else if (this._cache.left[1] > this._cache.right[1] && this._cache.left[1] >= this._mazeGrid.length - 1) {
          console.log('edge: no left turn');
          while (randomTurn === 1) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0] + 1, this._cache.right[1] + -1], [this._cache.right[0] + 2, this._cache.right[1] + -1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k51 = 0; _k51 < valuesArray.length; _k51++) {
              if (slash[0] === valuesArray[_k51][0] && slash[1] === valuesArray[_k51][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k51]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k52 = 0; _k52 < valuesArray.length; _k52++) {
            for (var _l26 = 0; _l26 < this._slashArray.length; _l26++) {
              if (valuesArray[_k52] === this._slashArray[_l26]) {
                emptyArray.push(valuesArray[_k52]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with edges - no right turn');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1] + -1], [this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k53 = 0; _k53 < valuesArray.length; _k53++) {
              if (slash[0] === valuesArray[_k53][0] && slash[1] === valuesArray[_k53][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k53]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k54 = 0; _k54 < valuesArray.length; _k54++) {
            for (var _l27 = 0; _l27 < this._slashArray.length; _l27++) {
              if (valuesArray[_k54] === this._slashArray[_l27]) {
                emptyArray.push(valuesArray[_k54]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
        } else {
          console.log('else, check for nearby slashes');
          valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1] + -1], [this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 2, this._cache.right[1]]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k55 = 0; _k55 < valuesArray.length; _k55++) {
              if (slash[0] === valuesArray[_k55][0] && slash[1] === valuesArray[_k55][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k55]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k56 = 0; _k56 < valuesArray.length; _k56++) {
            for (var _l28 = 0; _l28 < this._slashArray.length; _l28++) {
              if (valuesArray[_k56] === this._slashArray[_l28]) {
                emptyArray.push(valuesArray[_k56]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes say 0');
            console.log('randomTurn: straight: ' + randomTurn);
            rowIndex = this._cache.left[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.left[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.left = this._slashArray[i];
            i++;
            rowIndex = this._cache.right[0] + 1;
            console.log('rowIndex:');
            console.log(rowIndex);
            columnIndex = this._cache.right[1];
            console.log('columnIndex:');
            console.log(columnIndex);
            this.arraySlashes(i, rowIndex, columnIndex);
            this._cache.right = this._slashArray[i];
            i++;
            console.log('slash array:');
            console.log(this._slashArray);
            console.log('cache:');
            console.log(this._cache);
            return;
          }
          valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0] + 1, this._cache.right[1] + -1], [this._cache.right[0] + 2, this._cache.right[1] + -1]];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(function (slash) {
            for (var _k57 = 0; _k57 < valuesArray.length; _k57++) {
              if (slash[0] === valuesArray[_k57][0] && slash[1] === valuesArray[_k57][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[_k57]);
                console.log('emptyArray is now: ' + emptyArray);
              }
            }
          });
          for (var _k58 = 0; _k58 < valuesArray.length; _k58++) {
            for (var _l29 = 0; _l29 < this._slashArray.length; _l29++) {
              if (valuesArray[_k58] === this._slashArray[_l29]) {
                emptyArray.push(valuesArray[_k58]);
              }
            }
          }
          console.log('emptyArray: ' + emptyArray);
          if (emptyArray[0]) {
            console.log('slashes: no right turn');
            while (randomTurn === 2) {
              randomTurn = Math.floor(Math.random() * 3);
            }
            valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0] + 1, this._cache.left[1] + 1], [this._cache.left[0] + 2, this._cache.left[1] + 1]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k59 = 0; _k59 < valuesArray.length; _k59++) {
                if (slash[0] === valuesArray[_k59][0] && slash[1] === valuesArray[_k59][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k59]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k60 = 0; _k60 < valuesArray.length; _k60++) {
              for (var _l30 = 0; _l30 < this._slashArray.length; _l30++) {
                if (valuesArray[_k60] === this._slashArray[_l30]) {
                  emptyArray.push(valuesArray[_k60]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              randomTurn = 0;
              console.log('slashes disagree with other slashes - no left turn');
              console.log('randomTurn: straight: ' + randomTurn);
              rowIndex = this._cache.left[0] + 1;
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.left[1];
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.left = this._slashArray[i];
              i++;
              rowIndex = this._cache.right[0] + 1;
              console.log('rowIndex:');
              console.log(rowIndex);
              columnIndex = this._cache.right[1];
              console.log('columnIndex:');
              console.log(columnIndex);
              this.arraySlashes(i, rowIndex, columnIndex);
              this._cache.right = this._slashArray[i];
              i++;
              console.log('slash array:');
              console.log(this._slashArray);
              console.log('cache:');
              console.log(this._cache);
              return;
            }
          } else {
            valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0] + 1, this._cache.left[1] + 1], [this._cache.left[0] + 2, this._cache.left[1] + 1]];
            console.log(valuesArray);
            emptyArray = [];
            this._slashArray.forEach(function (slash) {
              for (var _k61 = 0; _k61 < valuesArray.length; _k61++) {
                if (slash[0] === valuesArray[_k61][0] && slash[1] === valuesArray[_k61][1]) {
                  console.log('hallelujah!');
                  emptyArray.push(valuesArray[_k61]);
                  console.log('emptyArray is now: ' + emptyArray);
                }
              }
            });
            for (var _k62 = 0; _k62 < valuesArray.length; _k62++) {
              for (var _l31 = 0; _l31 < this._slashArray.length; _l31++) {
                if (valuesArray[_k62] === this._slashArray[_l31]) {
                  emptyArray.push(valuesArray[_k62]);
                }
              }
            }
            console.log('emptyArray: ' + emptyArray);
            if (emptyArray[0]) {
              console.log('slashes: no left turn');
              while (randomTurn === 1) {
                randomTurn = Math.floor(Math.random() * 3);
              }
            }
          }
        }
        console.log('still there?');
      }

      console.log('now, go do the randomTurn');

      if (randomTurn === 0) {
        console.log('randomTurn: straight: ' + randomTurn);
        if (this._cache.left[0] < this._cache.right[0]) {
          console.log('this._cache.left[0] < this._cache.right[0]');
          rowIndex = this._cache.left[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1] + 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1] + 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[0] > this._cache.right[0]');
          rowIndex = this._cache.left[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1] - 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0];
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1] - 1;
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[1] < this._cache.right[1]) {
          console.log('this._cache.left[1] < this._cache.right[1]');
          rowIndex = this._cache.left[0] - 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0] - 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[1] > this._cache.right[1]) {
          console.log('this._cache.left[1] > this._cache.right[1]');
          rowIndex = this._cache.left[0] + 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.left[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.left = this._slashArray[i];
          i++;
          rowIndex = this._cache.right[0] + 1;
          console.log('rowIndex:');
          console.log(rowIndex);
          columnIndex = this._cache.right[1];
          console.log('columnIndex:');
          console.log(columnIndex);
          this.arraySlashes(i, rowIndex, columnIndex);
          this._cache.right = this._slashArray[i];
          i++;
          console.log('slash array:');
          console.log(this._slashArray);
          console.log('cache:');
          console.log(this._cache);
        }
      } else if (randomTurn === 1) {
        console.log('randomTurn: left: ' + randomTurn);
        var a = void 0;
        var b = void 0;
        var c = void 0;
        var d = void 0;
        if (this._cache.left[0] < this._cache.right[0]) {
          console.log('this._cache.left[0] < this._cache.right[0]');
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
        } else if (this._cache.left[1] > this._cache.right[1]) {
          console.log('this._cache.left[1] > this._cache.right[1]');
          a = 0;
          b = 1;
          c = 2;
          d = -1;

          rowIndex = this._cache.left[0] + a;
          columnIndex = this._cache.left[1] + b;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + b;
          columnIndex = this._cache.right[1] + a;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + c;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + b;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + a;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + b;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.left = this._slashArray[i - 6];
          this._cache.right = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[0] > this._cache.right[0]');

          rowIndex = this._cache.left[0] + 1;
          columnIndex = this._cache.left[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + 0;
          columnIndex = this._cache.right[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + -2;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + 1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + 1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.left = this._slashArray[i - 6];
          this._cache.right = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[1] < this._cache.right[1]) {
          console.log('this._cache.left[1] < this._cache.right[1]');

          rowIndex = this._cache.left[0] + 0;
          columnIndex = this._cache.left[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + -1;
          columnIndex = this._cache.right[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + -2;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.left = this._slashArray[i - 6];
          this._cache.right = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        }
      } else if (randomTurn === 2) {
        console.log('randomTurn: right: ' + randomTurn);
        var _a = void 0;
        var _b = void 0;
        var _c = void 0;
        if (this._cache.left[0] < this._cache.right[0]) {
          console.log('this._cache.left[0] < this._cache.right[0]');
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
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[0] > this._cache.right[0]');

          rowIndex = this._cache.right[0] - 1;
          columnIndex = this._cache.right[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + 0;
          columnIndex = this._cache.left[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + -2;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.right[0] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.right = this._slashArray[i - 6];
          this._cache.left = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[1] < this._cache.right[1]) {
          console.log('this._cache.left[1] < this._cache.right[1]');

          rowIndex = this._cache.right[0] + 0;
          columnIndex = this._cache.right[1] + 1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + -1;
          columnIndex = this._cache.left[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + -2;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + 1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + 1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.right = this._slashArray[i - 6];
          this._cache.left = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        } else if (this._cache.left[1] > this._cache.right[1]) {
          console.log('this._cache.left[1] > this._cache.right[1]');

          rowIndex = this._cache.right[0] + 0;
          columnIndex = this._cache.right[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + 1;
          columnIndex = this._cache.left[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          rowIndex = this._cache.left[0] + 2;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.left[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + 0;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          columnIndex = this._cache.right[1] + -1;
          this.arraySlashes(i, rowIndex, columnIndex);
          i++;

          this._cache.right = this._slashArray[i - 6];
          this._cache.left = this._slashArray[i - 1];
          console.log('cache:');
          console.log(this._cache);
        }
      }
      console.log('i: ' + i);
      console.log('rowIndex: ' + rowIndex);
      console.log('columnIndex: ' + columnIndex);
      this.randomSlashes(i, rowIndex, columnIndex);
    }
  }], [{
    key: 'generateMaze',
    value: function generateMaze() {
      var grid = [];
      for (var i = 0; i < 30; i++) {
        var row = [];
        for (var j = 0; j < 30; j++) {
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
maze.randomSlashes(0, 15, 0);