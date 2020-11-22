// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { parseBoard } from "./game";

const toCanonicalString = (board) =>
  board
    .map((row) => row.map((cell) => (cell ? "X" : ".")).join(" "))
    .join("\n");

expect.extend({
  toMatchBoard(actualBoard, expectedBoardString) {
    const actualString = toCanonicalString(actualBoard);
    const cleanedExpectedString = toCanonicalString(
      parseBoard(expectedBoardString)
    );
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
