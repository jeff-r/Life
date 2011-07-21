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

  lifediv = document.getElementById("life_outer");

  lifedoc = new LifeDoc(lifediv);
  lifedoc.addArray(blinker);
  lifedoc.makeGridElements();
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



