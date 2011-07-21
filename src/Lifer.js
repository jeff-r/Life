function LifeDoc(lifediv) {
  this.lifeGrid = new LifeGrid(lifediv);
  this.topdiv   = lifediv;
  this.longestDimension    = 300;      // width in pixels

  this.cellWidth  = 10;
  this.cellHeight = 10;
}


function startLife() {
  var glider = [ 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  var blinker = [ 
    [ 0, 0, 0, 0, 0], 
    [ 0, 0, 1, 0, 0], 
    [ 0, 0, 1, 0, 0], 
    [ 0, 0, 1, 0, 0],
    [ 0, 0, 0, 0, 0]
  ]

  if (document.lifeHasStarted)
    document.lifeDoc.runOneCycle();
  else {
    var lifediv = document.getElementById("life_outer");

    var lifedoc = new LifeDoc(lifediv);
    lifedoc.addArray(glider);
    lifedoc.makeTable();
    lifedoc.setGridColors();
    document.lifeDoc = lifedoc;
    document.lifeHasStarted = true;
  }

  var timer = setTimeout("startLife()", 500);
}

LifeDoc.prototype.runOneCycle = function() {
  this.lifeGrid = this.lifeGrid.makeNextGeneration();
  this.setGridColors();
}

LifeDoc.prototype.cellsAsFlattenedArray = function() {
  var allrows = this.topdiv.getElementsByTagName("td");
  var cells = new Array();
  var cellnum = 0;
  for (n=0; n<allrows.length; n++)
    if (allrows[n].className == "deadcell" || allrows[n].className == "livecell")
      cells[cellnum++] = allrows[n];

  this.cells = cells;
  return cells;
}

//LifeDoc.prototype.cellsAsFlattenedArray = function() {
//  var allrows = this.topdiv.getElementsByTagName("div");
//  var cells = new Array();
//  var cellnum = 0;
//  for (n=0; n<allrows.length; n++)
//    if (allrows[n].className == "deadcell" || allrows[n].className == "livecell")
//      cells[cellnum++] = allrows[n];
//
//  this.cells = cells;
//  return cells;
//}

LifeDoc.prototype.cellAt = function(x,y) {
  var index = y*this.lifeGrid.numCols() + x;
  return this.cells[index];
}

LifeDoc.prototype.setGridColors = function(array) {
  var rows  = this.lifeGrid.numRows();
  var cols  = this.lifeGrid.numCols();

  this.cellsAsFlattenedArray();

  for (x=0; x<cols; x++) {
    for (y=0; y<rows; y++) {
      var className = "deadcell";
      if (1 == this.lifeGrid.valueAt(x,y))
        className = "livecell";

      this.cellAt(x,y).className = className;
      // if (className == "livecell")
        // console.log("cell("+x+","+y+"): " + this.cellAt(x,y).className);
    }
  }
}

LifeDoc.prototype.addArray = function(array) {
  this.lifeGrid   = new LifeGrid(array);

  // this.cellWidth  = this.longestDimension / this.lifeGrid.numCols();
  // this.cellHeight = this.longestDimension / this.lifeGrid.numRows();
  // min = Math.min (this.cellWidth, this.cellHeight);

  // console.log("cellHeight = " + this.cellHeight);
  // console.log("cellWidth = " + this.cellWidth);
  // console.log("min = " + min);
  // this.cellWidth  = min;
  // this.cellHeight = min;
  
}

LifeDoc.prototype.addDiv = function(parentElement, className, width, height) {
  var div = document.createElement("div");
  div.className = className;

  if (width) {
    div.style.width = width + "px";
    // console.log("Adding div with width of " + width);
  }
  if (height) {
    div.style.height = width + "px";
  }

  parentElement.appendChild(div);
  return div;
}

LifeDoc.prototype.makeTable = function() {
  var rows = this.lifeGrid.numRows();
  var cols = this.lifeGrid.numCols();
  var rowwidth = cols * (this.cellWidth + 1);

  // console.log("rows = " + rows + "; cols = " + cols);
  // console.log("cellWidth = " + this.cellWidth);

  var table = document.createElement("table");

  for (y=0; y<rows; y++) {
    var tr = document.createElement("tr");
    tr.style.width = rowwidth + "px";
    for (x=0; x<cols; x++) {
      var className = "deadcell";
      if (1 == this.lifeGrid.valueAt(x,y))
        className = "livecell";
      var td = document.createElement("td");
      td.className    = className;
      td.style.width  = this.cellWidth  + "px";
      td.style.height = this.cellHeight + "px";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  this.topdiv.appendChild(table);

  var width  = cols * (this.cellWidth  + 1) + 1;
  // console.log("width = " + width);
  var height = rows * (this.cellHeight + 1) + 1;
  this.topdiv.style.height = height + "px";
  this.topdiv.style.width = width + "px";
}

