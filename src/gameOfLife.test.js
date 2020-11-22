import { parseGrid, countNeighbours, iterate } from "./gameOfLife";

describe("parseGrid", () => {
  it("creates a grid from a string", () => {
    const grid = `
      . . . . . .
      . . . . . .
      . X X . . .
      . X X . . .
      . . . . . .
      . . . . . .
    `;
    expect(parseGrid(grid)).toEqual([
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, true, true, false, false, false],
      [false, true, true, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ]);
  });
});

describe("countNeighbours", () => {
  it("counts living cell neighbours", () => {
    const grid = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(countNeighbours(parseGrid(grid))).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 1, 2, 2, 1, 0],
      [0, 2, 3, 3, 2, 0],
      [0, 2, 3, 3, 2, 0],
      [0, 1, 2, 2, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  });

  it("counts neighbours at the top and left edges", () => {
    const grid = `
      X X . .
      X X . .
      . . . .
      . . . .
    `;
    expect(countNeighbours(parseGrid(grid))).toEqual([
      [3, 3, 2, 0],
      [3, 3, 2, 0],
      [2, 2, 1, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("counts neighbours at the bottom and right edges", () => {
    const grid = `
      . . . .
      . . . .
      . . X X
      . . X X
    `;
    expect(countNeighbours(parseGrid(grid))).toEqual([
      [0, 0, 0, 0],
      [0, 1, 2, 2],
      [0, 2, 3, 3],
      [0, 2, 3, 3],
    ]);
  });

  it("counts neighbours on a non-square grid", () => {
    const grid = `
      X X . . . .
      X X . . . .
      . . . . X X
      . . . . X X
    `;
    expect(countNeighbours(parseGrid(grid))).toEqual([
      [3, 3, 2, 0, 0, 0],
      [3, 3, 2, 1, 2, 2],
      [2, 2, 1, 2, 3, 3],
      [0, 0, 0, 2, 3, 3],
    ]);
  });
});

describe("iterate", () => {
  it("leaves an empty grid unchanged", () => {
    const grid = `
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseGrid(grid))).toMatchGrid(grid);
  });

  it("leaves a square unchanged", () => {
    const grid = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseGrid(grid))).toMatchGrid(grid);
  });

  it("kills an isolated cell", () => {
    const initialGrid = `
      . . . . . .
      . . . . . .
      . . X . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    const finalGrid = `
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseGrid(initialGrid))).toMatchGrid(finalGrid);
  });

  it("creates a new cell", () => {
    const initialGrid = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X . . .
      . . . . . .
      . . . . . .
    `;
    const finalGrid = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseGrid(initialGrid))).toMatchGrid(finalGrid);
  });
});
