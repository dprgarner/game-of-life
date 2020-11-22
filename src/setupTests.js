import "@testing-library/jest-dom";

const toCanonicalString = (grid) =>
  grid.map((row) => row.map((cell) => (cell ? "X" : ".")).join(" ")).join("\n");

expect.extend({
  toMatchGrid(actualGrid, expectedGridString) {
    const actualString = toCanonicalString(actualGrid);
    const cleanedExpectedString = expectedGridString
      .trim()
      .split("\n")
      .map((row) => row.trim())
      .join("\n");
    const pass = actualString === cleanedExpectedString;

    if (pass) {
      return {
        message: () =>
          `Expected grids not to match.\nGrid:\n${cleanedExpectedString}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected grids to match.\nExpected:\n${cleanedExpectedString}\n\nActual:\n${actualString}`,
        pass: false,
      };
    }
  },
});
