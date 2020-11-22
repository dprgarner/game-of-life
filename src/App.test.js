import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { getCell, getBoardFromScreen } from "./testHelpers";

describe("default state", () => {
  it("initially renders a 2x2 box in a 15x15 grid", () => {
    render(<App />);

    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  it("sets a dead cell to alive on click", () => {
    render(<App />);

    fireEvent.click(getCell(1, 1));

    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . X . . . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  it("sets an alive cell to dead on click", () => {
    render(<App />);

    fireEvent.click(getCell(2, 2));

    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . X . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });
});

describe("slider", () => {
  it("sets the slider speed", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.1 },
    });
    expect(screen.getByRole("slider").value).toEqual("0.1");
    expect(screen.getByRole("slider").parentNode).toHaveTextContent("0.1s");
  });
});

describe("oscillator", () => {
  const initialBoard = `
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . X . . . . . . . . . . .
    . . . X . . . . . . . . . . .
    . . . X . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
  `;
  const oscillatedBoard = `
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . X X X . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . .
  `;

  beforeEach(() => {
    jest.useFakeTimers();

    render(<App />);
    fireEvent.click(getCell(2, 2));
    fireEvent.click(getCell(3, 2));
    fireEvent.click(getCell(4, 3));

    expect(getBoardFromScreen()).toMatchBoard(initialBoard);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("iterates forward on clicking the step button", () => {
    fireEvent.click(screen.getByTitle("Step Forward"));

    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);
  });

  it("iterates forward at the set slider speed", () => {
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.5 },
    });
    fireEvent.click(screen.getByTitle("Start"));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);

    act(() => jest.advanceTimersByTime(600));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);

    act(() => jest.advanceTimersByTime(600));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);
  });

  it("stops iterating when Stop button clicked", () => {
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.5 },
    });
    fireEvent.click(screen.getByTitle("Start"));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);

    act(() => jest.advanceTimersByTime(600));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);

    fireEvent.click(screen.getByTitle("Stop"));
    act(() => jest.advanceTimersByTime(600));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);
  });
});
