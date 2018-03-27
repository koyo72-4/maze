'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
  function Maze() {
    _classCallCheck(this, Maze);

    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
    this._cache = {};
    this._i = 0;
    this._object = {
      randomTurn: 0,
      valuesArray: [],
      emptyArray: [],
      edge_onlyStraight: false,
      edge_noLeft: false,
      edge_noRight: false,
      slashes_onlyStraight: false,
      slashes_noLeft: false,
      slashes_noRight: false
    };
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
    value: function arraySlashes(rowIndex, columnIndex) {
      this._slashArray[this._i] = [rowIndex, columnIndex];
      this._mazeGrid[rowIndex][columnIndex] = '/';
      console.log('------');
      console.log('slash array:');
      console.log(this._slashArray);
      this.print();
    }
  }, {
    key: 'turn',
    value: function turn() {
      this._object.randomTurn = Math.floor(Math.random() * 3);
      if (this._object.edge_onlyStraight || this._object.slashes_onlyStraight) {
        this._object.randomTurn = 0;
      } else if (this._object.edge_noLeft || this._object.slashes_noLeft) {
        while (this._object.randomTurn === 1) {
          this._object.randomTurn = Math.floor(Math.random() * 3);
        }
      } else if (this._object.edge_noRight || this._object.slashes_noRight) {
        while (this._object.randomTurn === 2) {
          this._object.randomTurn = Math.floor(Math.random() * 3);
        }
      }
    }
  }, {
    key: 'testEdge_onlyStraight',
    value: function testEdge_onlyStraight() {
      if (this._cache.left[0] < this._cache.right[0] && this._cache.left[1] >= this._mazeGrid[0].length - 2) {
        console.log('edge: only straight');
        this._object.edge_onlyStraight = true;
      } else if (this._cache.left[0] > this._cache.right[0] && this._cache.left[1] <= 1) {
        console.log('edge: only straight');
        this._object.edge_onlyStraight = true;
      } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[0] <= 1) {
        console.log('edge: only straight');
        this._object.edge_onlyStraight = true;
      } else if (this._cache.left[1] > this._cache.right[1] && this._cache.left[0] >= this._mazeGrid.length - 2) {
        console.log('edge: only straight');
        this._object.edge_onlyStraight = true;
      }
    }
  }, {
    key: 'testEdge_noLeft',
    value: function testEdge_noLeft() {
      if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] === 0) {
        console.log('edge: no left turn');
        this._object.edge_noLeft = true;
      } else if (this._cache.left[0] > this._cache.right[0] && this._cache.left[0] === this._mazeGrid.length - 1) {
        console.log('edge: no left turn');
        this._object.edge_noLeft = true;
      } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] === 0) {
        console.log('edge: no left turn');
        this._object.edge_noLeft = true;
      } else if (this._cache.left[1] > this._cache.right[1] && this._cache.left[1] === this._mazeGrid.length - 1) {
        console.log('edge: no left turn');
        this._object.edge_noLeft = true;
      }
    }
  }, {
    key: 'testEdge_noRight',
    value: function testEdge_noRight() {
      if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] >= this._mazeGrid.length - 3) {
        console.log('edge: no right turn');
        this._object.edge_noRight = true;
      } else if (this._cache.left[0] > this._cache.right[0] && this._cache.right[0] <= 1) {
        console.log('edge: no right turn');
        this._object.edge_noRight = true;
      } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] >= this._mazeGrid.length - 3) {
        console.log('edge: no right turn');
        this._object.edge_noRight = true;
      } else if (this._cache.left[1] > this._cache.right[1] && this._cache.right[1] <= 2) {
        console.log('edge: no right turn');
        this._object.edge_noRight = true;
      }
    }
  }, {
    key: 'testSlashes_onlyStraight',
    value: function testSlashes_onlyStraight() {
      var _this = this;

      if (this._cache.left[0] < this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0], this._cache.left[1] + 2], [this._cache.left[0] + 1, this._cache.left[1] + 2], [this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0], this._cache.right[1] + 2]];
      } else if (this._cache.left[0] > this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0], this._cache.left[1] + -2], [this._cache.right[0] + 1, this._cache.right[1] + -2], [this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0], this._cache.left[1] + -2]];
      } else if (this._cache.left[1] < this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1]], [this._cache.left[0] + -2, this._cache.left[1] + 1], [this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -2, this._cache.right[1]]];
      } else if (this._cache.left[1] > this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1]], [this._cache.left[0] + 2, this._cache.left[1] + -1], [this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 2, this._cache.right[1]]];
      }
      console.log(this._object.valuesArray);
      this._object.emptyArray = [];
      this._slashArray.forEach(function (slash) {
        for (var k = 0; k < _this._object.valuesArray.length; k++) {
          if (slash[0] === _this._object.valuesArray[k][0] && slash[1] === _this._object.valuesArray[k][1]) {
            _this._object.emptyArray.push(_this._object.valuesArray[k]);
            console.log('this._object.emptyArray is now: ' + _this._object.emptyArray);
          }
        }
      });
      console.log('this._object.emptyArray: ' + this._object.emptyArray);
      if (this._object.emptyArray[0]) {
        this._object.slashes_onlyStraight = true;
      }
    }
  }, {
    key: 'testSlashes_noLeft',
    value: function testSlashes_noLeft() {
      var _this2 = this;

      if (this._cache.left[0] < this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.left[0] + -1, this._cache.left[1]], [this._cache.left[0] + -1, this._cache.left[1] + 1], [this._cache.left[0] + -1, this._cache.left[1] + 2]];
      } else if (this._cache.left[0] > this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.left[0] + 1, this._cache.left[1]], [this._cache.left[0] + 1, this._cache.left[1] + -1], [this._cache.left[0] + 1, this._cache.left[1] + -2]];
      } else if (this._cache.left[1] < this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.left[0], this._cache.left[1] + -1], [this._cache.left[0] + -1, this._cache.left[1] + -1], [this._cache.left[0] + -2, this._cache.left[1] + -1]];
      } else if (this._cache.left[1] > this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.left[0], this._cache.left[1] + 1], [this._cache.left[0] + 1, this._cache.left[1] + 1], [this._cache.left[0] + 2, this._cache.left[1] + 1]];
      }
      console.log(this._object.valuesArray);
      this._object.emptyArray = [];
      this._slashArray.forEach(function (slash) {
        for (var k = 0; k < _this2._object.valuesArray.length; k++) {
          if (slash[0] === _this2._object.valuesArray[k][0] && slash[1] === _this2._object.valuesArray[k][1]) {
            _this2._object.emptyArray.push(_this2._object.valuesArray[k]);
            console.log('this._object.emptyArray is now: ' + _this2._object.emptyArray);
          }
        }
      });
      console.log('this._object.emptyArray: ' + this._object.emptyArray);
      if (this._object.emptyArray[0]) {
        this._object.slashes_noLeft = true;
      }
    }
  }, {
    key: 'testSlashes_noRight',
    value: function testSlashes_noRight() {
      var _this3 = this;

      if (this._cache.left[0] < this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.right[0] + 1, this._cache.right[1]], [this._cache.right[0] + 1, this._cache.right[1] + 1], [this._cache.right[0] + 1, this._cache.right[1] + 2]];
      } else if (this._cache.left[0] > this._cache.right[0]) {
        this._object.valuesArray = [[this._cache.right[0] + -1, this._cache.right[1]], [this._cache.right[0] + -1, this._cache.right[1] + -1], [this._cache.right[0] + -1, this._cache.right[1] + -2]];
      } else if (this._cache.left[1] < this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.right[0], this._cache.right[1] + 1], [this._cache.right[0] + -1, this._cache.right[1] + 1], [this._cache.right[0] + -2, this._cache.right[1] + 1]];
      } else if (this._cache.left[1] > this._cache.right[1]) {
        this._object.valuesArray = [[this._cache.right[0], this._cache.right[1] + -1], [this._cache.right[0] + 1, this._cache.right[1] + -1], [this._cache.right[0] + 2, this._cache.right[1] + -1]];
      }
      console.log(this._object.valuesArray);
      this._object.emptyArray = [];
      this._slashArray.forEach(function (slash) {
        for (var k = 0; k < _this3._object.valuesArray.length; k++) {
          if (slash[0] === _this3._object.valuesArray[k][0] && slash[1] === _this3._object.valuesArray[k][1]) {
            _this3._object.emptyArray.push(_this3._object.valuesArray[k]);
            console.log('this._object.emptyArray is now: ' + _this3._object.emptyArray);
          }
        }
      });
      console.log('this._object.emptyArray: ' + this._object.emptyArray);
      if (this._object.emptyArray[0]) {
        this._object.slashes_noRight = true;
      }
    }
  }, {
    key: 'goStraight',
    value: function goStraight(rowIndex, columnIndex) {
      console.log('going straight');
      var a = void 0;
      var b = void 0;
      if (this._cache.left[0] < this._cache.right[0]) {
        console.log('this._cache.left[0] < this._cache.right[0]');
        a = 0;
        b = 1;
      } else if (this._cache.left[0] > this._cache.right[0]) {
        console.log('this._cache.left[0] > this._cache.right[0]');
        a = 0;
        b = -1;
      } else if (this._cache.left[1] < this._cache.right[1]) {
        console.log('this._cache.left[1] < this._cache.right[1]');
        a = -1;
        b = 0;
      } else if (this._cache.left[1] > this._cache.right[1]) {
        console.log('this._cache.left[1] > this._cache.right[1]');
        a = 1;
        b = 0;
      }
      rowIndex = this._cache.left[0] + a;
      console.log('rowIndex:');
      console.log(rowIndex);
      columnIndex = this._cache.left[1] + b;
      console.log('columnIndex:');
      console.log(columnIndex);
      this.arraySlashes(rowIndex, columnIndex);
      this._cache.left = this._slashArray[this._i];
      this._i++;
      rowIndex = this._cache.right[0] + a;
      console.log('rowIndex:');
      console.log(rowIndex);
      columnIndex = this._cache.right[1] + b;
      console.log('columnIndex:');
      console.log(columnIndex);
      this.arraySlashes(rowIndex, columnIndex);
      this._cache.right = this._slashArray[this._i];
      this._i++;
      console.log('slash array:');
      console.log(this._slashArray);
      console.log('cache:');
      console.log(this._cache);
      this.print();
    }
  }, {
    key: 'goLeft',
    value: function goLeft(rowIndex, columnIndex) {
      console.log('going left');
      var a = void 0;
      var b = void 0;
      var c = void 0;
      var d = void 0;
      if (this._cache.left[0] < this._cache.right[0] || this._cache.left[0] > this._cache.right[0]) {
        if (this._cache.left[0] < this._cache.right[0]) {
          console.log('this._cache.left[0] < this._cache.right[0]');
          a = -1;
          b = 0;
          c = 1;
          d = 2;
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[0] > this._cache.right[0]');
          a = 1;
          b = 0;
          c = -1;
          d = -2;
        }
        rowIndex = this._cache.left[0] + a;
        columnIndex = this._cache.left[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.right[0] + b;
        columnIndex = this._cache.right[1] + c;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.right[1] + d;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + c;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        this._cache.left = this._slashArray[this._i - 6];
        this._cache.right = this._slashArray[this._i - 1];
        console.log('cache:');
        console.log(this._cache);
      } else if (this._cache.left[1] < this._cache.right[1] || this._cache.left[1] > this._cache.right[1]) {
        if (this._cache.left[1] < this._cache.right[1]) {
          console.log('this._cache.left[1] < this._cache.right[1]');
          a = 0;
          b = -1;
          c = -2;
        } else if (this._cache.left[1] > this._cache.right[1]) {
          console.log('this._cache.left[1] > this._cache.right[1]');
          a = 0;
          b = 1;
          c = 2;
        }
        rowIndex = this._cache.left[0] + a;
        columnIndex = this._cache.left[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.right[0] + b;
        columnIndex = this._cache.right[1] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.right[0] + c;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.right[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.left[1] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.left[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        this._cache.left = this._slashArray[this._i - 6];
        this._cache.right = this._slashArray[this._i - 1];
        console.log('cache:');
        console.log(this._cache);
      }
    }
  }, {
    key: 'goRight',
    value: function goRight(rowIndex, columnIndex) {
      console.log('going right');
      console.log('this._object.randomTurn: right: ' + this._object.randomTurn);
      var a = void 0;
      var b = void 0;
      var c = void 0;
      var d = void 0;
      if (this._cache.left[0] < this._cache.right[0] || this._cache.left[0] > this._cache.right[0]) {
        if (this._cache.left[0] < this._cache.right[0]) {
          console.log('this._cache.left[0] < this._cache.right[0]');
          a = 1;
          b = 0;
          c = 2;
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[0] > this._cache.right[0]');
          a = -1;
          b = 0;
          c = -2;
        }
        rowIndex = this._cache.right[0] + a;
        columnIndex = this._cache.right[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + b;
        columnIndex = this._cache.left[1] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.left[1] + c;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.right[0] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.right[0] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        this._cache.right = this._slashArray[this._i - 6];
        this._cache.left = this._slashArray[this._i - 1];
        console.log('cache:');
        console.log(this._cache);
      } else if (this._cache.left[1] < this._cache.right[1] || this._cache.left[1] > this._cache.right[1]) {
        if (this._cache.left[1] < this._cache.right[1]) {
          console.log('this._cache.left[1] < this._cache.right[1]');
          a = 0;
          b = 1;
          c = -1;
          d = -2;
        } else if (this._cache.left[0] > this._cache.right[0]) {
          console.log('this._cache.left[1] > this._cache.right[1]');
          a = 0;
          b = -1;
          c = 1;
          d = 2;
        }
        rowIndex = this._cache.right[0] + a;
        columnIndex = this._cache.right[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + c;
        columnIndex = this._cache.left[1] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        rowIndex = this._cache.left[0] + d;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.left[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.right[1] + a;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        columnIndex = this._cache.right[1] + b;
        this.arraySlashes(rowIndex, columnIndex);
        this._i++;
        this._cache.right = this._slashArray[this._i - 6];
        this._cache.left = this._slashArray[this._i - 1];
        console.log('cache:');
        console.log(this._cache);
      }
    }
  }, {
    key: 'randomSlashes',
    value: function randomSlashes(rowIndex, columnIndex) {
      if (this._i >= 100) {
        return;
      }
      if (!this._cache.left) {
        console.log('first time');
        this.arraySlashes(rowIndex, columnIndex);
        var randomLeft = Math.floor(Math.random() * 2);
        console.log(this._cache);
        if (randomLeft === 0) {
          this._cache.left = this._slashArray[this._i];
          console.log(this._cache.left[0]);
          this._i++;
          this.arraySlashes(rowIndex + 2, columnIndex);
          this._cache.right = this._slashArray[this._i];
          console.log(this._cache);
        } else if (randomLeft === 1) {
          this._cache.right = this._slashArray[this._i];
          console.log(this._cache.right[0]);
          this._i++;
          this.arraySlashes(rowIndex - 2, columnIndex);
          this._cache.left = this._slashArray[this._i];
          console.log(this._cache);
        }
        this._i++;
      }
      this.testEdge_onlyStraight();
      if (this._object.edge_onlyStraight === true) {
        this.turn();
        console.log('this._object.randomTurn: ' + this._object.randomTurn);
        this.goStraight(rowIndex, columnIndex);
        return;
      } else if (this._object.edge_onlyStraight === false) {
        this.testSlashes_onlyStraight();
        if (this._object.slashes_onlyStraight === true) {
          this.turn();
          console.log('this._object.randomTurn: ' + this._object.randomTurn);
          this.goStraight(rowIndex, columnIndex);
          return;
        } else if (this._object.slashes_onlyStraight === false) {
          this.testEdge_noLeft();
          if (this._object.edge_noLeft === true) {
            this.testSlashes_noRight();
            if (this._object.slashes_noRight === true) {
              this._object.edge_onlyStraight = true;
              this.turn();
              console.log('this._object.randomTurn: ' + this._object.randomTurn);
              this.goStraight(rowIndex, columnIndex);
              return;
            } else if (this._object.slashes_noRight === false) {
              this.turn();
              console.log('this._object.randomTurn: ' + this._object.randomTurn);
              if (this._object.randomTurn === 0) {
                this.goStraight(rowIndex, columnIndex);
              } else if (this._object.randomTurn === 2) {
                this.goRight(rowIndex, columnIndex);
              }
            }
          } else if (this._object.edge_noLeft === false) {
            this.testEdge_noRight();
            if (this._object.edge_noRight === true) {
              this.testSlashes_noLeft();
              if (this._object.slashes_noLeft === true) {
                this._object.edge_onlyStraight = true;
                this.turn();
                console.log('this._object.randomTurn: ' + this._object.randomTurn);
                this.goStraight(rowIndex, columnIndex);
                return;
              } else if (this._object.slashes_noLeft === false) {
                this.turn();
                console.log('this._object.randomTurn: ' + this._object.randomTurn);
                if (this._object.randomTurn === 0) {
                  this.goStraight(rowIndex, columnIndex);
                } else if (this._object.randomTurn === 1) {
                  this.goLeft(rowIndex, columnIndex);
                }
              }
            } else if (this._object.edge_noRight === false) {
              this.testSlashes_noLeft();
              if (this._object.slashes_noLeft === true) {
                this.testSlashes_noRight();
                if (this._object.slashes_noRight === true) {
                  this._object.slashes_onlyStraight = true;
                  this.turn();
                  console.log('this._object.randomTurn: ' + this._object.randomTurn);
                  this.goStraight(rowIndex, columnIndex);
                  return;
                } else if (this._object.slashes_noRight === false) {
                  this.turn();
                  console.log('this._object.randomTurn: ' + this._object.randomTurn);
                  if (this._object.randomTurn === 0) {
                    this.goStraight(rowIndex, columnIndex);
                  } else if (this._object.randomTurn === 2) {
                    this.goRight(rowIndex, columnIndex);
                  }
                }
              } else if (this._object.slashes_noLeft === false) {
                this.testSlashes_noRight();
                if (this._object.slashes_noRight === true) {
                  this.turn();
                  console.log('this._object.randomTurn: ' + this._object.randomTurn);
                  if (this._object.randomTurn === 0) {
                    this.goStraight(rowIndex, columnIndex);
                  } else if (this._object.randomTurn === 1) {
                    this.goLeft(rowIndex, columnIndex);
                  }
                } else if (this._object.slashes_noRight === false) {
                  this.turn();
                  console.log('this._object.randomTurn: ' + this._object.randomTurn);
                  if (this._object.randomTurn === 0) {
                    this.goStraight(rowIndex, columnIndex);
                  } else if (this._object.randomTurn === 1) {
                    this.goLeft(rowIndex, columnIndex);
                  } else if (this._object.randomTurn === 2) {
                    this.goRight(rowIndex, columnIndex);
                  }
                }
              }
            }
          }
        }
      }
      console.log('this._i: ' + this._i);
      console.log('rowIndex: ' + rowIndex);
      console.log('columnIndex: ' + columnIndex);
      this.randomSlashes(rowIndex, columnIndex);
    }
  }], [{
    key: 'generateMaze',
    value: function generateMaze() {
      var grid = [];
      for (var h = 0; h < 30; h++) {
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
maze.randomSlashes(15, 0);