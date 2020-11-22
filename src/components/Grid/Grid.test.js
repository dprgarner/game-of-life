import { render, fireEvent } from "@testing-library/react";

import { getCell, getGridFromScreen, setCell } from "../../testHelpers";
import { parseGrid } from "../../gameOfLife";
import Grid from "./Grid";

it("renders a 2x2 box in a 4x4 grid", () => {
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} />);

  expect(getGridFromScreen()).toMatchGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
});

it("triggers a callback on cell click", () => {
  const onCellClick = jest.fn();
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} onCellClick={onCellClick} />);

  setCell(3, 3);

  expect(onCellClick).toHaveBeenCalledWith(3, 3, true);
});

it("paints several cells in a single stroke", () => {
  const onCellClick = jest.fn();
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} onCellClick={onCellClick} />);

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

it("only sets cells when the mouse is down", () => {
  const onCellClick = jest.fn();
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} onCellClick={onCellClick} />);
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

it("sets hovered cells to dead if first clicked cell is alive", () => {
  const onCellClick = jest.fn();
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} onCellClick={onCellClick} />);

  fireEvent.mouseDown(getCell(1, 1));
  fireEvent.mouseOver(getCell(2, 1));
  fireEvent.mouseUp(getCell(2, 1));

  expect(onCellClick).toHaveBeenCalledTimes(2);
  expect(onCellClick).toHaveBeenCalledWith(1, 1, false);
  expect(onCellClick).toHaveBeenCalledWith(2, 1, false);
});

it("sets hovered cells to alive if first clicked cell is dead", () => {
  const onCellClick = jest.fn();
  const cells = parseGrid(`
    . . . .
    . X X .
    . X X .
    . . . .
  `);
  render(<Grid cells={cells} onCellClick={onCellClick} />);

  fireEvent.mouseDown(getCell(0, 1));
  fireEvent.mouseOver(getCell(1, 1));
  fireEvent.mouseUp(getCell(1, 1));

  expect(onCellClick).toHaveBeenCalledTimes(2);
  expect(onCellClick).toHaveBeenCalledWith(0, 1, true);
  expect(onCellClick).toHaveBeenCalledWith(1, 1, true);
});
