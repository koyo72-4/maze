class Maze {
  constructor() {
    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
    this._cache = {};
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

    let randomTurn = Math.floor(Math.random() * 3);
    console.log(`randomTurn: ${randomTurn}`);
    let valuesArray = [];
    let emptyArray = [];

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
        valuesArray = [
          [this._cache.left[0], this._cache.left[1] + 1],
          [this._cache.left[0], this._cache.left[1] + 2],
          [this._cache.left[0] + 1, this._cache.left[1] + 2],
          [this._cache.right[0], this._cache.right[1] + 1],
          [this._cache.right[0], this._cache.right[1] + 2]
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
        valuesArray = [
          [this._cache.left[0], this._cache.left[1] + 1],
          [this._cache.left[0], this._cache.left[1] + 2],
          [this._cache.left[0] + 1, this._cache.left[1] + 2],
          [this._cache.right[0], this._cache.right[1] + 1],
          [this._cache.right[0], this._cache.right[1] + 2]
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
        valuesArray = [
          [this._cache.left[0], this._cache.left[1] + 1],
          [this._cache.left[0], this._cache.left[1] + 2],
          [this._cache.left[0] + 1, this._cache.left[1] + 2],
          [this._cache.right[0], this._cache.right[1] + 1],
          [this._cache.right[0], this._cache.right[1] + 2]
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
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + (-1)],
          [this._cache.right[0], this._cache.left[1] + (-2)],
          [this._cache.right[0] + 1, this._cache.right[1] + (-2)],
          [this._cache.left[0], this._cache.left[1] + (-1)],
          [this._cache.left[0], this._cache.left[1] + (-2)]
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
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + (-1)],
          [this._cache.right[0], this._cache.left[1] + (-2)],
          [this._cache.right[0] + 1, this._cache.right[1] + (-2)],
          [this._cache.left[0], this._cache.left[1] + (-1)],
          [this._cache.left[0], this._cache.left[1] + (-2)]
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
        valuesArray = [
          [this._cache.right[0], this._cache.right[1] + (-1)],
          [this._cache.right[0], this._cache.left[1] + (-2)],
          [this._cache.right[0] + 1, this._cache.right[1] + (-2)],
          [this._cache.left[0], this._cache.left[1] + (-1)],
          [this._cache.left[0], this._cache.left[1] + (-2)]
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
        valuesArray = [
          [this._cache.left[0] + (-1), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1] + 1],
          [this._cache.right[0] + (-1), this._cache.right[1]],
          [this._cache.right[0] + (-2), this._cache.right[1]]
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
        valuesArray = [
          [this._cache.left[0] + (-1), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1] + 1],
          [this._cache.right[0] + (-1), this._cache.right[1]],
          [this._cache.right[0] + (-2), this._cache.right[1]]
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
        valuesArray = [
          [this._cache.left[0] + (-1), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1]],
          [this._cache.left[0] + (-2), this._cache.left[1] + 1],
          [this._cache.right[0] + (-1), this._cache.right[1]],
          [this._cache.right[0] + (-2), this._cache.right[1]]
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
        valuesArray = [
          [this._cache.left[0] + 1, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1] + (-1)],
          [this._cache.right[0] + 1, this._cache.right[1]],
          [this._cache.right[0] + 2, this._cache.right[1]]
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
        valuesArray = [
          [this._cache.left[0] + 1, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1] + (-1)],
          [this._cache.right[0] + 1, this._cache.right[1]],
          [this._cache.right[0] + 2, this._cache.right[1]]
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
        valuesArray = [
          [this._cache.left[0] + 1, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1]],
          [this._cache.left[0] + 2, this._cache.left[1] + (-1)],
          [this._cache.right[0] + 1, this._cache.right[1]],
          [this._cache.right[0] + 2, this._cache.right[1]]
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
      let a;
      let b;
      let c;
      let d;
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
        columnIndex = this._cache.right[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.right[1] + (-2);
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
        columnIndex = this._cache.left[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.right[0] + (-1);
        columnIndex = this._cache.right[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.right[0] + (-2);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.right[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.left[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.left[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        this._cache.left = this._slashArray[i - 6];
        this._cache.right = this._slashArray[i - 1];
        console.log('cache:');
        console.log(this._cache);
      }
    } else if (randomTurn === 2) {
      console.log('randomTurn: right: ' + randomTurn);
      let a;
      let b;
      let c;
      if (this._cache.left[0] < this._cache.right[0]) {
        console.log('this._cache.left[0] < this._cache.right[0]');
        a = 1;
        b = 0;
        c = 2;

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

      } else if (this._cache.left[0] > this._cache.right[0]) {
        console.log('this._cache.left[0] > this._cache.right[0]');

        rowIndex = this._cache.right[0] - 1;
        columnIndex = this._cache.right[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.left[0] + 0;
        columnIndex = this._cache.left[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.left[1] + (-2);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.left[0] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.right[0] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.right[0] + (-1);
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

        rowIndex = this._cache.left[0] + (-1);
        columnIndex = this._cache.left[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.left[0] + (-2);
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
        columnIndex = this._cache.right[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.left[0] + 1;
        columnIndex = this._cache.left[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        rowIndex = this._cache.left[0] + 2;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.left[1] + (-1);
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.right[1] + 0;
        this.arraySlashes(i, rowIndex, columnIndex);
        i++;

        columnIndex = this._cache.right[1] + (-1);
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
}


const maze = new Maze();
console.log(maze._mazeGrid);
maze.print();
maze.randomSlashes(0, 15, 0);
