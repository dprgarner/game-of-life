import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { getCell, getCells } from "./Board.test";
import { parseBoard } from "./game";

describe("default state", () => {
  it("initially renders a 2x2 box in a 15x15 grid", () => {
    render(<App />);

    expect(getCells()).toEqual(
      parseBoard(`
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
    `)
    );
  });

  it("sets a dead cell to alive on click", () => {
    render(<App />);

    fireEvent.click(getCell(1, 1));

    expect(getCells()).toEqual(
      parseBoard(`
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
    `)
    );
  });

  it("sets an alive cell to dead on click", () => {
    render(<App />);

    fireEvent.click(getCell(2, 2));

    expect(getCells()).toEqual(
      parseBoard(`
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
    `)
    );
  });
});

describe("slider", () => {
  it("sets the slider speed", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.1 },
    });
    expect(screen.getByRole("slider").value).toEqual("0.1");
    expect(screen.getByRole("slider").parentNode.textContent).toContain("0.1s");
  });
});

describe("oscillator", () => {
  const initialBoardState = parseBoard(`
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
  `);
  const oscillatedBoardState = parseBoard(`
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
  `);

  beforeEach(() => {
    jest.useFakeTimers();

    render(<App />);
    fireEvent.click(getCell(2, 2));
    fireEvent.click(getCell(3, 2));
    fireEvent.click(getCell(4, 3));

    expect(getCells()).toEqual(initialBoardState);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("iterates forward on clicking the step button", () => {
    fireEvent.click(screen.getByTitle("Step Forward"));

    expect(getCells()).toEqual(oscillatedBoardState);
  });

  it("iterates forward at the set slider speed", () => {
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.5 },
    });
    fireEvent.click(screen.getByTitle("Start"));
    expect(getCells()).toEqual(initialBoardState);

    act(() => jest.advanceTimersByTime(600));
    expect(getCells()).toEqual(oscillatedBoardState);

    act(() => jest.advanceTimersByTime(600));
    expect(getCells()).toEqual(initialBoardState);
  });

  it("stops iterating when Stop button clicked", () => {
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.5 },
    });
    fireEvent.click(screen.getByTitle("Start"));
    expect(getCells()).toEqual(initialBoardState);

    act(() => jest.advanceTimersByTime(600));
    expect(getCells()).toEqual(oscillatedBoardState);

    fireEvent.click(screen.getByTitle("Stop"));
    act(() => jest.advanceTimersByTime(600));
    expect(getCells()).toEqual(oscillatedBoardState);
  });
});
