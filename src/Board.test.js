import { render, fireEvent } from "@testing-library/react";

import { parseBoard } from "./gameOfLife";
import Board from "./Board";
import { getCell, getBoardFromScreen } from "./testHelpers";

test("renders a 2x2 box in a 4x4 grid", () => {
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} />);

  expect(getBoardFromScreen()).toMatchBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
});

test("triggers a callback on cell click", () => {
  const onCellClick = jest.fn();
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} onCellClick={onCellClick} />);

  fireEvent.click(getCell(3, 3));

  expect(onCellClick).toHaveBeenCalledWith(3, 3);
});
