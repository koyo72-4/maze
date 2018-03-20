class Maze {
  constructor() {
    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
  }

  static generateMaze() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
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
    if (!this._slashArray[i]) {
      this._slashArray[i] = [rowIndex, columnIndex];
      this._mazeGrid[rowIndex][columnIndex] = '/';
      i++;
      console.log('------');
      console.log('slash array:');
      console.log(this._slashArray);
      this.print();
      console.log('------');
    }
  }

  randomSlashes(i, rowIndex, columnIndex) {
    while (i < 200) {
      if (i === 0) {
        this._mazeGrid[rowIndex][columnIndex] = '/';
        this.arraySlashes(0, rowIndex, columnIndex);
        i++;
        this.print();
        console.log('------');
      }
      if (this._slashArray.length === 2) {
        console.log('this._slashArray.length === 2');
        if (this._slashArray[0][0] === this._slashArray[1][0]) {
          if (this._slashArray[0][1] > this._slashArray[1][1]) {
            rowIndex = this._slashArray[0][0] - 2;
            columnIndex = this._slashArray[0][1];
            this.arraySlashes(2, rowIndex, columnIndex);
          } else if (this._slashArray[0][1] < this._slashArray[1][1]) {
            rowIndex = this._slashArray[0][0] + 2;
            columnIndex = this._slashArray[0][1];
            this.arraySlashes(2, rowIndex, columnIndex);
          }
        } else if (this._slashArray[0][1] === this._slashArray[1][1]) {
          if (this._slashArray[0][0] > this._slashArray[1][0]) {
            rowIndex = this._slashArray[0][0];
            columnIndex = this._slashArray[0][1] - 2;
            this.arraySlashes(2, rowIndex, columnIndex);
          } else if (this._slashArray[0][0] < this._slashArray[1][0]) {
            rowIndex = this._slashArray[0][0];
            columnIndex = this._slashArray[0][1] + 2;
            this.arraySlashes(2, rowIndex, columnIndex);
          }
        }
      }
      if (this._slashArray.length === 3) {
        if (this._slashArray[0][0] === this._slashArray[2][0]) {
          rowIndex = this._slashArray[1][0];
          columnIndex = this._slashArray[2][1];
          this.arraySlashes(3, rowIndex, columnIndex);
        } else if (this._slashArray[0][1] === this._slashArray[2][1]) {
          rowIndex = this._slashArray[2][0];
          columnIndex = this._slashArray[1][1];
          this.arraySlashes(3, rowIndex, columnIndex);
        }
      }
      if (this._slashArray.length === 4) {
        let randomTurn = Math.floor(Math.random() * 3);
        if (randomTurn === 0) {
          let a;
          let b;
          let c;
          if (this._slashArray[3][0] < this._slashArray[1][0] && this._slashArray[3][1] < this._slashArray[2][1]) {
            a = -1;
            b = 0;
          } else if (this._slashArray[3][0] > this._slashArray[1][0] && this._slashArray[3][1] > this._slashArray[2][1]) {
            a = 1;
            b = 0;
          } else if (this._slashArray[3][0] < this._slashArray[2][0] && this._slashArray[3][1] < this._slashArray[1][1]) {
            a = 0;
            b = 1;
            c = -1;
          } else if (this._slashArray[3][0] > this._slashArray[2][0] && this._slashArray[3][1] > this._slashArray[1][1]) {
            a = 0;
            b = -1;
            c = 1;
          }
          if (this._slashArray[3][0] < this._slashArray[1][0] && this._slashArray[3][1] < this._slashArray[2][1] || this._slashArray[3][0] > this._slashArray[1][0] && this._slashArray[3][1] > this._slashArray[2][1]) {
            rowIndex = this._slashArray[3][0] + a;
            columnIndex = this._slashArray[3][1] + b;
            this.arraySlashes(4, rowIndex, columnIndex);

            rowIndex = this._slashArray[1][0] + b;
            columnIndex = this._slashArray[1][1] + a;
            this.arraySlashes(5, rowIndex, columnIndex);

            rowIndex = this._slashArray[5][0] + b;
            columnIndex = this._slashArray[5][1] + a;
            this.arraySlashes(6, rowIndex, columnIndex);

            rowIndex = this._slashArray[6][0] + a;
            columnIndex = this._slashArray[6][1] + b;
            this.arraySlashes(7, rowIndex, columnIndex);

            rowIndex = this._slashArray[7][0] + a;
            columnIndex = this._slashArray[7][1] + b;
            this.arraySlashes(8, rowIndex, columnIndex);

            rowIndex = this._slashArray[8][0] + a;
            columnIndex = this._slashArray[8][1] + b;
            this.arraySlashes(9, rowIndex, columnIndex);

            i += 6;
            console.log('------');
            this.print();
            console.log(this._slashArray);
          } else if (this._slashArray[3][0] < this._slashArray[2][0] && this._slashArray[3][1] < this._slashArray[1][1] || this._slashArray[3][0] > this._slashArray[2][0] && this._slashArray[3][1] > this._slashArray[1][1]) {
            rowIndex = this._slashArray[1][0] + a;
            columnIndex = this._slashArray[1][1] + b;
            this.arraySlashes(4, rowIndex, columnIndex);

            rowIndex = this._slashArray[3][0] + c;
            columnIndex = this._slashArray[3][1] + a;
            this.arraySlashes(5, rowIndex, columnIndex);

            rowIndex = this._slashArray[5][0] + c;
            columnIndex = this._slashArray[5][1] + a;
            this.arraySlashes(6, rowIndex, columnIndex);

            rowIndex = this._slashArray[6][0] + a;
            columnIndex = this._slashArray[6][1] + b;
            this.arraySlashes(7, rowIndex, columnIndex);

            rowIndex = this._slashArray[7][0] + a;
            columnIndex = this._slashArray[7][1] + b;
            this.arraySlashes(8, rowIndex, columnIndex);

            rowIndex = this._slashArray[8][0] + a;
            columnIndex = this._slashArray[8][1] + b;
            this.arraySlashes(9, rowIndex, columnIndex);

            i += 6;
            console.log('------');
            this.print();
            console.log(this._slashArray);
          }
        } else if (randomTurn === 1) {
          let a;
          let b;
          let c;
          if (this._slashArray[3][0] < this._slashArray[1][0] && this._slashArray[3][1] < this._slashArray[2][1]) {
            a = 1;
            b = 0;
            c = -1;
          } else if (this._slashArray[3][0] > this._slashArray[1][0] && this._slashArray[3][1] > this._slashArray[2][1]) {
            a = -1;
            b = 0;
            c = 1;
          } else if (this._slashArray[3][0] < this._slashArray[2][0] && this._slashArray[3][1] < this._slashArray[1][1]) {
            a = 0;
            b = -1;
          } else if (this._slashArray[3][0] > this._slashArray[2][0] && this._slashArray[3][1] > this._slashArray[1][1]) {
            a = 0;
            b = 1;
          }
          if (this._slashArray[3][0] < this._slashArray[1][0] && this._slashArray[3][1] < this._slashArray[2][1] || this._slashArray[3][0] > this._slashArray[1][0] && this._slashArray[3][1] > this._slashArray[2][1]) {
            rowIndex = this._slashArray[1][0] + a;
            columnIndex = this._slashArray[1][1] + b;
            this.arraySlashes(4, rowIndex, columnIndex);

            rowIndex = this._slashArray[3][0] + b;
            columnIndex = this._slashArray[3][1] + c;
            this.arraySlashes(5, rowIndex, columnIndex);

            rowIndex = this._slashArray[5][0] + b;
            columnIndex = this._slashArray[5][1] + c;
            this.arraySlashes(6, rowIndex, columnIndex);

            rowIndex = this._slashArray[6][0] + a;
            columnIndex = this._slashArray[6][1] + b;
            this.arraySlashes(7, rowIndex, columnIndex);

            rowIndex = this._slashArray[7][0] + a;
            columnIndex = this._slashArray[7][1] + b;
            this.arraySlashes(8, rowIndex, columnIndex);

            rowIndex = this._slashArray[8][0] + a;
            columnIndex = this._slashArray[8][1] + b;
            this.arraySlashes(9, rowIndex, columnIndex);

            i += 6;
            console.log('------');
            this.print();
            console.log(this._slashArray);
          } else if (this._slashArray[3][0] < this._slashArray[2][0] && this._slashArray[3][1] < this._slashArray[1][1] || this._slashArray[3][0] > this._slashArray[2][0] && this._slashArray[3][1] > this._slashArray[1][1]) {
            rowIndex = this._slashArray[3][0] + a;
            columnIndex = this._slashArray[3][1] + b;
            this.arraySlashes(4, rowIndex, columnIndex);

            rowIndex = this._slashArray[1][0] + b;
            columnIndex = this._slashArray[1][1] + a;
            this.arraySlashes(5, rowIndex, columnIndex);

            rowIndex = this._slashArray[5][0] + b;
            columnIndex = this._slashArray[5][1] + a;
            this.arraySlashes(6, rowIndex, columnIndex);

            rowIndex = this._slashArray[6][0] + a;
            columnIndex = this._slashArray[6][1] + b;
            this.arraySlashes(7, rowIndex, columnIndex);

            rowIndex = this._slashArray[7][0] + a;
            columnIndex = this._slashArray[7][1] + b;
            this.arraySlashes(8, rowIndex, columnIndex);

            rowIndex = this._slashArray[8][0] + a;
            columnIndex = this._slashArray[8][1] + b;
            this.arraySlashes(9, rowIndex, columnIndex);

            i += 6;
            console.log('------');
            this.print();
            console.log(this._slashArray);
          }
        } else if (randomTurn === 2) {
          let a;
          let b;
          console.log('console');
          if (this._slashArray[3][0] < this._slashArray[1][0] && this._slashArray[3][1] < this._slashArray[2][1]) {
            a = 0;
            b = -1;
            console.log('a, b');
          } else if (this._slashArray[3][0] > this._slashArray[1][0] && this._slashArray[3][1] > this._slashArray[2][1]) {
            a = 0;
            b = 1;
            console.log('a, b');
          } else if (this._slashArray[3][0] < this._slashArray[2][0] && this._slashArray[3][1] < this._slashArray[1][1]) {
            a = -1;
            b = 0;
            console.log('a, b');
          } else if (this._slashArray[3][0] > this._slashArray[2][0] && this._slashArray[3][1] > this._slashArray[1][1]) {
            a = 1;
            b = 0;
            console.log('a, b');
          }
          rowIndex = this._slashArray[3][0] + a;
          columnIndex = this._slashArray[3][1] + b;
          this.arraySlashes(4, rowIndex, columnIndex);

          rowIndex = this._slashArray[4][0] + a;
          columnIndex = this._slashArray[4][1] + b;
          this.arraySlashes(5, rowIndex, columnIndex);

          rowIndex = this._slashArray[1][0] + a;
          columnIndex = this._slashArray[1][1] + b;
          this.arraySlashes(6, rowIndex, columnIndex);

          rowIndex = this._slashArray[6][0] + a;
          columnIndex = this._slashArray[6][1] + b;
          this.arraySlashes(7, rowIndex, columnIndex);

          i += 4;
          console.log('------');
          this.print();
          console.log(this._slashArray);
        }
        return;
      }
      console.log(`rowIndex: ${rowIndex}`);
      console.log(`columnIndex: ${columnIndex}`);
      const gridOffsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
      ];
      let freeSpaces = gridOffsets.filter(offset => {
        let freeRow = rowIndex + offset[0];
        let freeColumn = columnIndex + offset[1];
        if (freeRow >= 0 && freeRow < 10 && freeColumn >= 0 && freeColumn < 10) {
          return this._mazeGrid[rowIndex + offset[0]][columnIndex + offset[1]] === 'o';
        }
      });
      console.log(`freeSpaces:`);
      console.log(freeSpaces);
      let frees = freeSpaces.map(offset => {
        offset[0] += rowIndex;
        offset[1] += columnIndex;
        return offset;
      });
      console.log(`frees:`);
      console.log(frees);
      if (frees[0]) {
        console.log(true);
        let nextSlashOffset = Math.floor(Math.random() * frees.length);
        console.log(`nextSlashOffset: ${nextSlashOffset}`);
        let newRowIndex = frees[nextSlashOffset][0];
        let newColumnIndex = frees[nextSlashOffset][1];
        if (this._mazeGrid[newRowIndex][newColumnIndex] === 'o') {
          this._mazeGrid[newRowIndex][newColumnIndex] = '/';
          this.arraySlashes(i, newRowIndex, newColumnIndex);
          i++;
          this.print();
          console.log('-----');
          console.log(`newRowIndex: ${newRowIndex}`);
          console.log(`newColumnIndex: ${newColumnIndex}`);
          return this.randomSlashes(i, newRowIndex, newColumnIndex);
        }
      } else {
        console.log(false);
        return;
      }
    }
  }

}

const maze = new Maze();
console.log(maze._mazeGrid);
maze.print();
maze.randomSlashes(0, 4, 4);
