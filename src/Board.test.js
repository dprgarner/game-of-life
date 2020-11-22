import {
  render,
  screen,
  getAllByRole,
  fireEvent,
} from "@testing-library/react";

import { parseBoard } from "./game";
import Board from "./Board";

export const getCells = () =>
  screen
    .getAllByRole("row")
    .map((row) =>
      getAllByRole(row, "cell").map((cell) => cell.classList.contains("alive"))
    );

export const getCell = (i, j) =>
  getAllByRole(screen.getAllByRole("row")[i], "cell")[j];

test("renders a 2x2 box in a 4x4 grid", () => {
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} />);

  expect(getCells()).toEqual(cells);
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
