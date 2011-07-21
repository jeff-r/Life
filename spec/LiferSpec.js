describe("lifer", function() {

    var array_4x4;
    var grid_4x4;

  beforeEach(function() {
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

});

