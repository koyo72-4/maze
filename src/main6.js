class Maze {
  constructor() {
    this._mazeGrid = Maze.generateMaze();
    this._slashArray = [];
    this._cache = {};
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
    this._slashArray[i] = [rowIndex, columnIndex];
    this._mazeGrid[rowIndex][columnIndex] = '/';
    console.log('------');
    console.log('slash array:');
    console.log(this._slashArray);
    this.print();
  }

  randomSlashes(i, rowIndex, columnIndex) {
    while (i < 200) {
      this.arraySlashes(i, rowIndex, columnIndex);
      if (!this._cache[0]) {
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
        let a;
        let b;
        let c;
        let d;
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
        let a;
        let b;
        let c;
        if (this._cache.left[0] < this._cache.right[0]) {
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

          return;
        } else {
          return;
        }
      }
    }

  }

}

const maze = new Maze();
console.log(maze._mazeGrid);
maze.print();
maze.randomSlashes(0, 4, 0);
