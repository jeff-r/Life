describe("lifeGrid", function() {

    var array_4x4;
    var grid_4x4;
    var block;

  beforeEach(function() {
    block = [ 
      [ 0, 0, 0, 0], 
      [ 0, 1, 1, 0], 
      [ 0, 1, 1, 0], 
      [ 0, 0, 0, 0]
    ]
    array_4x4 = [ 
      [ 0, 1, 1, 0], 
      [ 0, 0, 0, 0], 
      [ 1, 0, 1, 0], 
      [ 0, 0, 1, 1]
    ]
    grid_4x4 = new LifeGrid(array_4x4);
  });

  it("should be able to return a new empty array with same dimensions", function() {
    expect(grid_4x4.makeNewEmptyArray().length).toEqual(4);
    expect(grid_4x4.makeNewEmptyArray()[0].length).toEqual(4);
  });

  it("should know if the next generation lives or dies", function() {
    expect(grid_4x4.liveOrDieAt(1,1)).toEqual(0);
    expect(grid_4x4.liveOrDieAt(2,1)).toEqual(1);
    expect(grid_4x4.liveOrDieAt(2,2)).toEqual(1);
    expect(grid_4x4.liveOrDieAt(1,0)).toEqual(1);

    var beehive = [ 
      [ 0, 0, 0, 0, 0, 0], 
      [ 0, 0, 1, 1, 0, 0], 
      [ 0, 1, 0, 0, 1, 0], 
      [ 0, 0, 1, 1, 0, 0],
      [ 0, 0, 0, 0, 0, 0]
    ]
    var beehiveGrid = new LifeGrid(beehive);
    expect(beehiveGrid.liveOrDieAt(4,2)).toEqual(1);
  });

  it("should find the correct number of neighbors at a given x and y", function() {
    expect(grid_4x4.neighborsAt(1,2)).toEqual(3);
    expect(grid_4x4.neighborsAt(1,1)).toEqual(4);
    expect(grid_4x4.neighborsAt(3,3)).toEqual(4);
  });

  it("should find the correct value at a given x and y", function() {
    expect(grid_4x4.valueAt(0,0)).toEqual(0);
    expect(grid_4x4.valueAt(1,0)).toEqual(1);
    expect(grid_4x4.valueAt(-1,0)).toEqual(0);
    expect(grid_4x4.valueAt(-1,3)).toEqual(1);
    expect(grid_4x4.valueAt(-1,2)).toEqual(0);
  });

  it("should wrap y correctly", function() {
    expect(grid_4x4.wrapped_y(-1)).toEqual(3);
    expect(grid_4x4.wrapped_y(4)).toEqual(0);
    expect(grid_4x4.wrapped_y(2)).toEqual(2);
  });

  it("should wrap x correctly", function() {
    expect(grid_4x4.wrapped_x(-1)).toEqual(3);
    expect(grid_4x4.wrapped_x(4)).toEqual(0);
    expect(grid_4x4.wrapped_x(2)).toEqual(2);
  });

  it("should return correct number of cols", function() {
    expect(grid_4x4.numCols()).toEqual(4);
  });

  it("should return correct number of rows", function() {
    expect(grid_4x4.numRows()).toEqual(4);
  });

  it("should exist", function() {
    expect(4).toEqual(4);
  });

  it("should identify an equivalent grid", function() {
    expect(grid_4x4.equalToArray(array_4x4)).toEqual(true);
    expect(grid_4x4.equalToArray(block)).toEqual(false);

    var beehive = [ 
      [ 0, 0, 0, 0, 0, 0], 
      [ 0, 0, 1, 1, 0, 0], 
      [ 0, 1, 0, 0, 1, 0], 
      [ 0, 0, 1, 1, 0, 0],
      [ 0, 0, 0, 0, 0, 0]
    ]
    var beehiveGrid = new LifeGrid(beehive);
    expect(beehiveGrid.equalToArray(beehive)).toEqual(true);
  });

  // We know what some specific patterns generate 
  it("should make a block from a block", function() {
    var blockGrid = new LifeGrid(block);
    var nextGenerationArray = blockGrid.makeNextGenerationArray();
    var res = blockGrid.equalToArray(nextGenerationArray);
    expect(blockGrid.equalToArray(nextGenerationArray)).toEqual(true);
  });

  it("should make a beehive from a beehive", function() {
    var beehive = [ 
      [ 0, 0, 0, 0, 0, 0], 
      [ 0, 0, 1, 1, 0, 0], 
      [ 0, 1, 0, 0, 1, 0], 
      [ 0, 0, 1, 1, 0, 0],
      [ 0, 0, 0, 0, 0, 0]
    ]
    var beehiveGrid = new LifeGrid(beehive);
    var nextGenerationArray = beehiveGrid.makeNextGenerationArray();

    // beehiveGrid.dumpArray("beehive: ");
    // ng = new LifeGrid(nextGenerationArray);
    // ng.dumpArray("nextGenerationArray: ");

    expect(beehiveGrid.equalToArray(nextGenerationArray)).toEqual(true);
  });


  it("should toggle a blinker", function() {
    var blinker1 = [ 
      [ 0, 0, 0, 0, 0], 
      [ 0, 0, 1, 0, 0], 
      [ 0, 0, 1, 0, 0], 
      [ 0, 0, 1, 0, 0],
      [ 0, 0, 0, 0, 0]
    ]
    var blinker2 = [ 
      [ 0, 0, 0, 0, 0], 
      [ 0, 0, 0, 0, 0], 
      [ 0, 1, 1, 1, 0], 
      [ 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0]
    ]
    var blinker1Grid        = new LifeGrid(blinker1);
    var blinker2Grid        = new LifeGrid(blinker2);
    var nextGenerationArray = blinker1Grid.makeNextGenerationArray();
    expect(blinker2Grid.equalToArray(nextGenerationArray)).toEqual(true);
  });

});

