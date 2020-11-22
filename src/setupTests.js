import "@testing-library/jest-dom";

const toCanonicalString = (board) =>
  board
    .map((row) => row.map((cell) => (cell ? "X" : ".")).join(" "))
    .join("\n");

expect.extend({
  toMatchBoard(actualBoard, expectedBoardString) {
    const actualString = toCanonicalString(actualBoard);
    const cleanedExpectedString = expectedBoardString
      .trim()
      .split("\n")
      .map((row) => row.trim())
      .join("\n");
    const pass = actualString === cleanedExpectedString;

    if (pass) {
      return {
        message: () =>
          `Expected boards not to match.\nBoard:\n${cleanedExpectedString}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected boards to match.\nExpected:\n${cleanedExpectedString}\n\nActual:\n${actualString}`,
        pass: false,
      };
    }
  },
});
