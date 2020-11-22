export const parseGrid = (gridString) =>
  gridString
    .trim()
    .split("\n")
    .map((rowString) =>
      Array.from(rowString).reduce((acc, char) => {
        if (char === "X") acc.push(true);
        if (char === ".") acc.push(false);
        return acc;
      }, [])
    );

const flatten = (array) =>
  array.reduce((flatArray, nestedArray) => flatArray.concat(nestedArray));

const neighbours = flatten(
  [-1, 0, 1].map((di) => [-1, 0, 1].map((dj) => [di, dj]))
).filter(([di, dj]) => di !== 0 || dj !== 0);

export const countNeighbours = (grid) =>
  grid.map((row, i) =>
    row.map((_col, j) =>
      neighbours.reduce(
        (neighboursCount, [di, dj]) =>
          i + di >= 0 && i + di < grid.length && grid[i + di][j + dj]
            ? neighboursCount + 1
            : neighboursCount,
        0
      )
    )
  );

export const iterate = (grid) =>
  countNeighbours(grid).map((row, i) =>
    row.map(
      (neighbours, j) =>
        (grid[i][j] && (neighbours === 2 || neighbours === 3)) ||
        neighbours === 3
    )
  );
