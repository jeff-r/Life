function LifeGrid(theGrid) {
  this.grid = theGrid;
}
LifeGrid.prototype.numCols = function() {
  return this.grid[0].length;
}
LifeGrid.prototype.numRows = function() {
  return this.grid.length;
}

LifeGrid.prototype.wrapped_x = function(x) {
  var cols = this.numCols();
  while (x < 0)
    x += cols;
  while (x >= cols)
    x -= cols;
  return x;
}

LifeGrid.prototype.wrapped_y = function(y) {
  var rows = this.numRows();
  while (y < 0)
    y += rows;
  while (y >= rows)
    y -= rows;
  return y;
}

LifeGrid.prototype.neighborsAt = function(x,y) {
  var sum = 0;
  for (dx = -1; dx <= 1; dx++) {
    for (dy = -1; dy <=1; dy++) {
      if (!(dx == 0 && dy == 0)) {
        xx = x + dx;
        yy = y + dy;
        //console.log("valueAt(" + xx + ", " + yy + ") is " + this.valueAt(xx, yy));
        sum += this.valueAt(xx,yy);
        //console.log("sum is now " + sum);
      }
    }
  }
  return sum;
}

LifeGrid.prototype.valueAt = function(x,y) {
  x = this.wrapped_x(x);
  y = this.wrapped_y(y);
  // console.log("grid[" + y + "][" + x + "] is " + this.grid[y][x]);

  return this.grid[y][x];
}

// Return the alive-or-dead state of the next generation of a given cell
//
// from wikipedia, the rules are:
//  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
//  Any live cell with two or three live neighbours lives on to the next generation.
//  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
//  Any live cell with more than three live neighbours dies, as if by overcrowding.
// 
// By which we see that there are more ways to die than to be born.
// it's a cold, hard world.
LifeGrid.prototype.liveOrDieAt = function(x,y) {
  var neighbors = this.neighborsAt(x,y);
  var current = this.valueAt(x,y);

  console.log( "("+x+", "+y+");  current = " + current + "; neighbors = " + neighbors );

  switch(neighbors) {
    case 0:
    case 1:
      return 0;
    case 2:
      return current;
    case 3:
      return 1;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return 0;
  }
}
