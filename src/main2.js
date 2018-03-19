class Maze {
  constructor() {
    this._mazeGrid = Maze.generateMaze();
    this._numberOfSlashes = 0;
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
      console.log('slash array:');
      console.log(this._slashArray);
    }
  }

  randomSlashes(i, rowIndex, columnIndex) {
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
          this._numberOfSlashes++;
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
