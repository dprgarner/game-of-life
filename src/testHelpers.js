import {
  screen,
  getAllByRole,
  fireEvent,
  getAllByTestId,
} from "@testing-library/react";

// Cells can also be selected by using the "row" and "cell" roles, but this is
// much slower than data-testid.
export const getGridFromScreen = () =>
  screen
    .getAllByTestId("row")
    .map((row) =>
      getAllByTestId(row, "cell").map((cell) =>
        cell.classList.contains("alive")
      )
    );

export const getCell = (i, j) =>
  getAllByRole(screen.getAllByRole("row")[i], "cell")[j];

export const setCell = (i, j) => {
  fireEvent.mouseDown(getCell(i, j));
  fireEvent.mouseUp(getCell(i, j));
};
