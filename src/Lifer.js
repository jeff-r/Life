function LifeDoc(lifediv) {
  this.lifeGrid = new LifeGrid(lifediv);
  this.topdiv = lifediv;
  this.width = 200;      // width in pixels
}


function startLife() {
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
    lifedoc.addArray(blinker);
    lifedoc.makeGridElements();
    document.lifeDoc = lifedoc;
    document.lifeHasStarted = true;
  }

  var timer = setTimeout("startLife()", 3000);
}

LifeDoc.prototype.runOneCycle = function() {
  this.lifeGrid = this.lifeGrid.makeNextGeneration();
  this.setGridColors();
}

LifeDoc.prototype.cellsAsFlattenedArray = function() {
  var allrows = this.topdiv.getElementsByTagName("div");
  var cells = new Array();
  var cellnum = 0;
  for (n=0; n<allrows.length; n++)
    if (allrows[n].className == "deadcell" || allrows[n].className == "livecell")
      cells[cellnum++] = allrows[n];

  this.cells = cells;
  return cells;
}

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

      // console.log("cell("+x+","+y+"): " + this.cellAt(x,y).className);
      this.cellAt(x,y).className = className;
    }
  }
}

LifeDoc.prototype.addArray = function(array) {
  this.lifeGrid   = new LifeGrid(array);
  this.cellWidth  = this.width / this.lifeGrid.numCols();
  this.cellHeight = this.cellWidth;
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

LifeDoc.prototype.makeGridElements = function() {
  var rows = this.lifeGrid.numRows();
  var cols = this.lifeGrid.numCols();
  var rowwidth = cols * (this.cellWidth + 2);

  for (x=0; x<cols; x++) {
    var rowDiv = this.addDiv(this.topdiv, "rowdiv", rowwidth);
    for (y=0; y<rows; y++) {
      var className = "deadcell";
      if (1 == this.lifeGrid.valueAt(x,y))
        className = "livecell";
      this.addDiv(rowDiv, className, this.cellWidth, this.cellHeight);
    }
  }

  var height = rows * (this.cellHeight + 1) + 1;
  var width  = cols * (this.cellWidth  + 1) + 1;
  this.topdiv.style.height = height + "px";
  this.topdiv.style.width = width + "px";
}



