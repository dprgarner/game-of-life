import { screen, getAllByRole, fireEvent } from "@testing-library/react";

export const getBoardFromScreen = () =>
  screen
    .getAllByRole("row")
    .map((row) =>
      getAllByRole(row, "cell").map((cell) => cell.classList.contains("alive"))
    );

export const getCell = (i, j) =>
  getAllByRole(screen.getAllByRole("row")[i], "cell")[j];

export const setCell = (i, j) => {
  fireEvent.mouseDown(getCell(i, j));
  fireEvent.mouseUp(getCell(i, j));
};
