class Maze {
  constructor() {
    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
    this._cache = {};
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

  static generateMaze() {
    let grid = [];
    for (let i = 0; i < 30; i++) {
      let row = [];
      for (let j = 0; j < 30; j++) {
        row.push('o');
      }
      grid.push(row);
    }
    return grid;
  }

  print() {
    console.log(this._mazeGrid.map(row => row.join('  ')).join('\n'));
  }

  arraySlashes(i, rowIndex, columnIndex) {
    this._slashArray[i] = [rowIndex, columnIndex];
    this._mazeGrid[rowIndex][columnIndex] = '/';
    console.log('------');
    console.log('slash array:');
    console.log(this._slashArray);
    this.print();
  }

  turn() {
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

  testEdge_onlyStraight() {
    if (this._cache.left[0] < this._cache.right[0] && this._cache.left[1] >= this._mazeGrid[0].length - 2) {
      this._object.edge_onlyStraight = true;
      randomTurn = 0;
    } else if (this._cache.left[0] > this._cache.right[0] && this._cache.left[1] <= 1) {
      this._object.edge_onlyStraight = true;
      randomTurn = 0;
    } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[0] <= 1) {
      this._object.edge_onlyStraight = true;
      randomTurn = 0;
    } else if (this._cache.left[1] > this._cache.right[1] && this._cache.left[0] >= this._mazeGrid.length - 2) {
      this._object.edge_onlyStraight = true;
      randomTurn = 0;
    }
  }

  testSlashes_onlyStraight() {
    if (this._cache.left[0] < this._cache.right[0]) {
      valuesArray = [
        [this._cache.left[0], this._cache.left[1] + 1],
        [this._cache.left[0], this._cache.left[1] + 2],
        [this._cache.left[0] + 1, this._cache.left[1] + 2],
        [this._cache.right[0], this._cache.right[1] + 1],
        [this._cache.right[0], this._cache.right[1] + 2]
      ];
    } else if (this._cache.left[0] > this._cache.right[0]) {
      valuesArray = [
        [this._cache.right[0], this._cache.right[1] + (-1)],
        [this._cache.right[0], this._cache.left[1] + (-2)],
        [this._cache.right[0] + 1, this._cache.right[1] + (-2)],
        [this._cache.left[0], this._cache.left[1] + (-1)],
        [this._cache.left[0], this._cache.left[1] + (-2)]
      ];
    } else if (this._cache.left[1] < this._cache.right[1]) {
      valuesArray = [
        [this._cache.left[0] + (-1), this._cache.left[1]],
        [this._cache.left[0] + (-2), this._cache.left[1]],
        [this._cache.left[0] + (-2), this._cache.left[1] + 1],
        [this._cache.right[0] + (-1), this._cache.right[1]],
        [this._cache.right[0] + (-2), this._cache.right[1]]
      ];
    } else if (this._cache.left[1] > this._cache.right[1]) {
      valuesArray = [
        [this._cache.left[0] + 1, this._cache.left[1]],
        [this._cache.left[0] + 2, this._cache.left[1]],
        [this._cache.left[0] + 2, this._cache.left[1] + (-1)],
        [this._cache.right[0] + 1, this._cache.right[1]],
        [this._cache.right[0] + 2, this._cache.right[1]]
      ];
    }
    console.log(valuesArray);
    emptyArray = [];
    this._slashArray.forEach(slash => {
      for (let k = 0; k < valuesArray.length; k++) {
        if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
          console.log('hallelujah!');
          emptyArray.push(valuesArray[k]);
          console.log(`emptyArray is now: ${emptyArray}`);
        }
      }
    });
    for (let k = 0; k < valuesArray.length; k++) {
      for (let l = 0; l < this._slashArray.length; l++) {
        if (valuesArray[k] === this._slashArray[l]) {
          emptyArray.push(valuesArray[k]);
        }
      }
    }
    console.log(`emptyArray: ${emptyArray}`);
    if (emptyArray[0]) {
      randomTurn = 0;
      console.log('slashes say 0');
      console.log('randomTurn: straight: ' + randomTurn);
      this.goStraight();
      return;
    }
  }

  goStraight() {
    console.log('going straight');
    let a;
    let b;
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
    this.arraySlashes(i, rowIndex, columnIndex);
    this._cache.left = this._slashArray[i];
    i++;
    rowIndex = this._cache.right[0] + a;
    console.log('rowIndex:');
    console.log(rowIndex);
    columnIndex = this._cache.right[1] + b;
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
  }

  goLeft() {
    console.log('going left');
    let a;
    let b;
    let c;
    let d;
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
    }
  }

  goRight() {
    console.log('going right');
    console.log('randomTurn: right: ' + randomTurn);
    let a;
    let b;
    let c;
    let d;
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
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.left[0] + b;
      columnIndex = this._cache.left[1] + a;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      columnIndex = this._cache.left[1] + c;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.left[0] + a;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.right[0] + b;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.right[0] + a;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      this._cache.right = this._slashArray[i - 6];
      this._cache.left = this._slashArray[i - 1];
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
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.left[0] + c;
      columnIndex = this._cache.left[1] + a;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      rowIndex = this._cache.left[0] + d;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      columnIndex = this._cache.left[1] + b;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      columnIndex = this._cache.right[1] + a;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      columnIndex = this._cache.right[1] + b;
      this.arraySlashes(i, rowIndex, columnIndex);
      i++;
      this._cache.right = this._slashArray[i - 6];
      this._cache.left = this._slashArray[i - 1];
      console.log('cache:');
      console.log(this._cache);
    }
  }

  randomSlashes(i, rowIndex, columnIndex) {
    if (i >= 100) {
      return;
    }
    if (!this._cache.left) {
      console.log('first time');
      this.arraySlashes(i, rowIndex, columnIndex);
      let randomLeft = Math.floor(Math.random() * 2);
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

    this.turn();
    console.log(`randomTurn: ${this._object.randomTurn}`);
    this._object.valuesArray = [];
    this._object.emptyArray = [];

    if (this._cache.left[0] < this._cache.right[0]) {
      console.log('this._cache.left[0] < this._cache.right[0]');
      if (this._cache.left[0] < this._cache.right[0] && this._cache.left[1] >= this._mazeGrid[0].length - 2) {
        randomTurn = 0;
        console.log('edge: can only go straight');
        console.log('randomTurn: straight: ' + randomTurn);
        this.goStraight();
        return;
      } else if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] >= this._mazeGrid.length - 3) {
        console.log('edge: no right turn');
        while (randomTurn === 2) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.left[0] + (-1), this._cache.left[1]],
          [this._cache.left[0] + (-1), this._cache.left[1] + 1],
          [this._cache.left[0] + (-1), this._cache.left[1] + 2]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no left turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else if (this._cache.left[0] < this._cache.right[0] && this._cache.left[0] === 0) {
        console.log('edge: no left turn');
        while (randomTurn === 1) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.right[0] + 1, this._cache.right[1]],
          [this._cache.right[0] + 1, this._cache.right[1] + 1],
          [this._cache.right[0] + 1, this._cache.right[1] + 2]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no right turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else {
        console.log('else, check for nearby slashes');
        this.testSlashes_onlyStraight();
        console.log('slashes do NOT say 0');
        valuesArray = [
          [this._cache.right[0] + 1, this._cache.right[1]],
          [this._cache.right[0] + 1, this._cache.right[1] + 1],
          [this._cache.right[0] + 1, this._cache.right[1] + 2]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          console.log('slashes: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [
            [this._cache.left[0] + (-1), this._cache.left[1]],
            [this._cache.left[0] + (-1), this._cache.left[1] + 1],
            [this._cache.left[0] + (-1), this._cache.left[1] + 2]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with other slashes - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            this.goStraight();
            return;
          }
          console.log('slashes do NOT say no Right turn');
        } else {
          valuesArray = [
            [this._cache.left[0] + (-1), this._cache.left[1]],
            [this._cache.left[0] + (-1), this._cache.left[1] + 1],
            [this._cache.left[0] + (-1), this._cache.left[1] + 2]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
          if (emptyArray[0]) {
            console.log('slashes: no left turn');
            while (randomTurn === 1) {
              randomTurn = Math.floor(Math.random() * 3);
            }
          }
        }
        console.log('slashes do NOT say no Left turn');
      }
      console.log(`randomTurn: ${randomTurn}`);

    } else if (this._cache.left[0] > this._cache.right[0]) {
      console.log('this._cache.left[0] > this._cache.right[0]');
      if (this._cache.left[0] > this._cache.right[0] && this._cache.left[1] === 1) {
        randomTurn = 0;
        console.log('edge: can only go straight');
        console.log('randomTurn: straight: ' + randomTurn);
        this.goStraight();
        return;
      } else if (this._cache.left[0] > this._cache.right[0] && this._cache.right[0] <= 1) {
        console.log('edge: no right turn');
        while (randomTurn === 2) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.left[0] + 1, this._cache.left[1]],
          [this._cache.left[0] + 1, this._cache.left[1] + (-1)],
          [this._cache.left[0] + 1, this._cache.left[1] + (-2)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no left turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else if (this._cache.left[0] > this._cache.right[0] && this._cache.left[0] >= this._mazeGrid.length - 1) {
        console.log('edge: no left turn');
        while (randomTurn === 1) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.right[0] + (-1), this._cache.right[1]],
          [this._cache.right[0] + (-1), this._cache.right[1] + (-1)],
          [this._cache.right[0] + (-1), this._cache.right[1] + (-2)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no right turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else {
        console.log('else, check for nearby slashes');
        this.testSlashes_onlyStraight();
        valuesArray = [
          [this._cache.right[0] + (-1), this._cache.right[1]],
          [this._cache.right[0] + (-1), this._cache.right[1] + (-1)],
          [this._cache.right[0] + (-1), this._cache.right[1] + (-2)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          console.log('slashes: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [
            [this._cache.left[0] + 1, this._cache.left[1]],
            [this._cache.left[0] + 1, this._cache.left[1] + (-1)],
            [this._cache.left[0] + 1, this._cache.left[1] + (-2)]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with other slashes - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            this.goStraight();
            return;
          }
        } else {
          valuesArray = [
            [this._cache.left[0] + 1, this._cache.left[1]],
            [this._cache.left[0] + 1, this._cache.left[1] + (-1)],
            [this._cache.left[0] + 1, this._cache.left[1] + (-2)]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
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
        this.goStraight();
        return;
      } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] >= this._mazeGrid.length - 3) {
        console.log('edge: no right turn');
        while (randomTurn === 2) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.left[0], this._cache.left[1] + (-1)],
          [this._cache.left[0] + (-1), this._cache.left[1] + (-1)],
          [this._cache.left[0] + (-2), this._cache.left[1] + (-1)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no left turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else if (this._cache.left[1] < this._cache.right[1] && this._cache.left[1] === 0) {
        console.log('edge: no left turn');
        while (randomTurn === 1) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + 1],
          [this._cache.right[0] + (-1), this._cache.right[1] + 1],
          [this._cache.right[0] + (-2), this._cache.right[1] + 1]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no right turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else {
        console.log('else, check for nearby slashes');
        this.testSlashes_onlyStraight();
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + 1],
          [this._cache.right[0] + (-1), this._cache.right[1] + 1],
          [this._cache.right[0] + (-2), this._cache.right[1] + 1]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          console.log('slashes: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [
            [this._cache.left[0], this._cache.left[1] + (-1)],
            [this._cache.left[0] + (-1), this._cache.left[1] + (-1)],
            [this._cache.left[0] + (-2), this._cache.left[1] + (-1)]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with other slashes - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            this.goStraight();
            return;
          }
        } else {
          valuesArray = [
            [this._cache.left[0], this._cache.left[1] + (-1)],
            [this._cache.left[0] + (-1), this._cache.left[1] + (-1)],
            [this._cache.left[0] + (-2), this._cache.left[1] + (-1)]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
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
        this.goStraight();
        return;
      } else if (this._cache.left[1] > this._cache.right[1] && this._cache.right[1] <= 2) {
        console.log('edge: no right turn');
        while (randomTurn === 2) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.left[0], this._cache.left[1] + 1],
          [this._cache.left[0] + 1, this._cache.left[1] + 1],
          [this._cache.left[0] + 2, this._cache.left[1] + 1]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no left turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else if (this._cache.left[1] > this._cache.right[1] && this._cache.left[1] >= this._mazeGrid.length - 1) {
        console.log('edge: no left turn');
        while (randomTurn === 1) {
          randomTurn = Math.floor(Math.random() * 3);
        }
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + (-1)],
          [this._cache.right[0] + 1, this._cache.right[1] + (-1)],
          [this._cache.right[0] + 2, this._cache.right[1] + (-1)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          randomTurn = 0;
          console.log('slashes disagree with edges - no right turn');
          console.log('randomTurn: straight: ' + randomTurn);
          this.goStraight();
          return;
        }
        this.testSlashes_onlyStraight();
      } else {
        console.log('else, check for nearby slashes');
        this.testSlashes_onlyStraight();
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + (-1)],
          [this._cache.right[0] + 1, this._cache.right[1] + (-1)],
          [this._cache.right[0] + 2, this._cache.right[1] + (-1)]
        ];
        console.log(valuesArray);
        emptyArray = [];
        this._slashArray.forEach(slash => {
          for (let k = 0; k < valuesArray.length; k++) {
            if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
              console.log('hallelujah!');
              emptyArray.push(valuesArray[k]);
              console.log(`emptyArray is now: ${emptyArray}`);
            }
          }
        });
        for (let k = 0; k < valuesArray.length; k++) {
          for (let l = 0; l < this._slashArray.length; l++) {
            if (valuesArray[k] === this._slashArray[l]) {
              emptyArray.push(valuesArray[k]);
            }
          }
        }
        console.log(`emptyArray: ${emptyArray}`);
        if (emptyArray[0]) {
          console.log('slashes: no right turn');
          while (randomTurn === 2) {
            randomTurn = Math.floor(Math.random() * 3);
          }
          valuesArray = [
            [this._cache.left[0], this._cache.left[1] + 1],
            [this._cache.left[0] + 1, this._cache.left[1] + 1],
            [this._cache.left[0] + 2, this._cache.left[1] + 1]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
          if (emptyArray[0]) {
            randomTurn = 0;
            console.log('slashes disagree with other slashes - no left turn');
            console.log('randomTurn: straight: ' + randomTurn);
            this.goStraight();
            return;
          }
        } else {
          valuesArray = [
            [this._cache.left[0], this._cache.left[1] + 1],
            [this._cache.left[0] + 1, this._cache.left[1] + 1],
            [this._cache.left[0] + 2, this._cache.left[1] + 1]
          ];
          console.log(valuesArray);
          emptyArray = [];
          this._slashArray.forEach(slash => {
            for (let k = 0; k < valuesArray.length; k++) {
              if (slash[0] === valuesArray[k][0] && slash[1] === valuesArray[k][1]) {
                console.log('hallelujah!');
                emptyArray.push(valuesArray[k]);
                console.log(`emptyArray is now: ${emptyArray}`);
              }
            }
          });
          for (let k = 0; k < valuesArray.length; k++) {
            for (let l = 0; l < this._slashArray.length; l++) {
              if (valuesArray[k] === this._slashArray[l]) {
                emptyArray.push(valuesArray[k]);
              }
            }
          }
          console.log(`emptyArray: ${emptyArray}`);
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

    if (this._object.randomTurn === 0) {
      console.log('randomTurn: straight: ' + randomTurn);
      this.goStraight();
    } else if (this._object.randomTurn === 1) {
      console.log('randomTurn: left: ' + randomTurn);
      this.goLeft();
    } else if (this._object.randomTurn === 2) {
      console.log('randomTurn: right: ' + randomTurn);
      this.goRight();
    }
    }
    console.log('i: ' + i);
    console.log('rowIndex: ' + rowIndex);
    console.log('columnIndex: ' + columnIndex);
    this.randomSlashes(i, rowIndex, columnIndex);
  }
}


const maze = new Maze();
console.log(maze._mazeGrid);
maze.print();
maze.randomSlashes(0, 15, 0);
