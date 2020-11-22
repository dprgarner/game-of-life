import { parseBoard, countNeighbours, iterate } from "./gameOfLife";

describe("parseBoard", () => {
  it("creates a board from a string", () => {
    const board = `
      . . . . . .
      . . . . . .
      . X X . . .
      . X X . . .
      . . . . . .
      . . . . . .
    `;
    expect(parseBoard(board)).toEqual([
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
    const board = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(countNeighbours(parseBoard(board))).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 1, 2, 2, 1, 0],
      [0, 2, 3, 3, 2, 0],
      [0, 2, 3, 3, 2, 0],
      [0, 1, 2, 2, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  });

  it("counts neighbours at the top and left edges", () => {
    const board = `
      X X . .
      X X . .
      . . . .
      . . . .
    `;
    expect(countNeighbours(parseBoard(board))).toEqual([
      [3, 3, 2, 0],
      [3, 3, 2, 0],
      [2, 2, 1, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("counts neighbours at the bottom and right edges", () => {
    const board = `
      . . . .
      . . . .
      . . X X
      . . X X
    `;
    expect(countNeighbours(parseBoard(board))).toEqual([
      [0, 0, 0, 0],
      [0, 1, 2, 2],
      [0, 2, 3, 3],
      [0, 2, 3, 3],
    ]);
  });

  it("counts neighbours on a non-square board", () => {
    const board = `
      X X . . . .
      X X . . . .
      . . . . X X
      . . . . X X
    `;
    expect(countNeighbours(parseBoard(board))).toEqual([
      [3, 3, 2, 0, 0, 0],
      [3, 3, 2, 1, 2, 2],
      [2, 2, 1, 2, 3, 3],
      [0, 0, 0, 2, 3, 3],
    ]);
  });
});

describe("iterate", () => {
  it("leaves an empty board unchanged", () => {
    const board = `
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseBoard(board))).toMatchBoard(board);
  });

  it("leaves a square unchanged", () => {
    const board = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseBoard(board))).toMatchBoard(board);
  });

  it("kills an isolated cell", () => {
    const initialBoard = `
      . . . . . .
      . . . . . .
      . . X . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    const finalBoard = `
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseBoard(initialBoard))).toMatchBoard(finalBoard);
  });

  it("creates a new cell", () => {
    const initialBoard = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X . . .
      . . . . . .
      . . . . . .
    `;
    const finalBoard = `
      . . . . . .
      . . . . . .
      . . X X . .
      . . X X . .
      . . . . . .
      . . . . . .
    `;
    expect(iterate(parseBoard(initialBoard))).toMatchBoard(finalBoard);
  });
});
