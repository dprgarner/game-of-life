import { render, fireEvent } from "@testing-library/react";

import { parseBoard } from "./gameOfLife";
import Board from "./Board";
import { getCell, getBoardFromScreen, setCell } from "./testHelpers";

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

  setCell(3, 3);

  expect(onCellClick).toHaveBeenCalledWith(3, 3, true);
});

test("paints several cells in a single stroke", () => {
  const onCellClick = jest.fn();
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} onCellClick={onCellClick} />);

  fireEvent.mouseDown(getCell(3, 0));
  fireEvent.mouseOver(getCell(3, 1));
  fireEvent.mouseOver(getCell(3, 2));
  fireEvent.mouseOver(getCell(3, 3));
  fireEvent.mouseUp(getCell(3, 3));

  expect(onCellClick).toHaveBeenCalledWith(3, 0, true);
  expect(onCellClick).toHaveBeenCalledWith(3, 1, true);
  expect(onCellClick).toHaveBeenCalledWith(3, 2, true);
  expect(onCellClick).toHaveBeenCalledWith(3, 3, true);
});

test("only sets cells when the mouse is down", () => {
  const onCellClick = jest.fn();
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} onCellClick={onCellClick} />);
  fireEvent.mouseOver(getCell(3, 0));
  fireEvent.mouseOver(getCell(3, 1));
  expect(onCellClick).not.toHaveBeenCalled();

  fireEvent.mouseDown(getCell(3, 1));
  fireEvent.mouseUp(getCell(3, 1));
  expect(onCellClick).toHaveBeenCalledTimes(1);
  expect(onCellClick).toHaveBeenLastCalledWith(3, 1, true);

  fireEvent.mouseOver(getCell(3, 2));
  expect(onCellClick).toHaveBeenCalledTimes(1);
});

test("sets hovered cells to dead if first clicked cell is alive", () => {
  const onCellClick = jest.fn();
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} onCellClick={onCellClick} />);

  fireEvent.mouseDown(getCell(1, 1));
  fireEvent.mouseOver(getCell(2, 1));
  fireEvent.mouseUp(getCell(2, 1));

  expect(onCellClick).toHaveBeenCalledTimes(2);
  expect(onCellClick).toHaveBeenCalledWith(1, 1, false);
  expect(onCellClick).toHaveBeenCalledWith(2, 1, false);
});

test("sets hovered cells to alive if first clicked cell is dead", () => {
  const onCellClick = jest.fn();
  const cells = parseBoard(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Board cells={cells} onCellClick={onCellClick} />);

  fireEvent.mouseDown(getCell(0, 1));
  fireEvent.mouseOver(getCell(1, 1));
  fireEvent.mouseUp(getCell(1, 1));

  expect(onCellClick).toHaveBeenCalledTimes(2);
  expect(onCellClick).toHaveBeenCalledWith(0, 1, true);
  expect(onCellClick).toHaveBeenCalledWith(1, 1, true);
});
