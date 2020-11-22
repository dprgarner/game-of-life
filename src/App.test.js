import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { getBoardFromScreen, getCell, setCell } from "./testHelpers";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

const getPresetDropdown = () => screen.getByLabelText(/Choose Preset/);

const setPresetDropdown = (option) =>
  fireEvent.change(getPresetDropdown(), {
    target: { value: option.value },
  });

describe("preset patterns", () => {
  it('renders "none" by default', () => {
    render(<App />);

    const presetDropdown = getPresetDropdown();
    expect(presetDropdown).toBeInTheDocument();
    expect(presetDropdown.value).toBe("none");
    expect(getBoardFromScreen()).toMatchBoard(`
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
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  it('loads the "boxes" preset', () => {
    render(<App />);

    setPresetDropdown(screen.getByText("Boxes"));

    expect(getPresetDropdown().value).toBe("boxes");
    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . X X . X X . X X . X X . .
      . . X X . X X . X X . X X . .
      . . . . . . . . . . . . . . .
      . . X X . X X . X X . X X . .
      . . X X . X X . X X . X X . .
      . . . . . . . . . . . . . . .
      . . X X . X X . X X . X X . .
      . . X X . X X . X X . X X . .
      . . . . . . . . . . . . . . .
      . . X X . X X . X X . X X . .
      . . X X . X X . X X . X X . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  it('loads the "oscillators" preset', () => {
    render(<App />);

    setPresetDropdown(screen.getByText("Oscillators"));

    expect(getPresetDropdown().value).toBe("oscillators");
    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . X . . . . . . . . . X . .
      . . X . . . . . . . . . X . .
      . . X . . . . . . . . . X . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . X . . . . . . . . . X . .
      . . X . . . . . . . . . X . .
      . . X . . . . . . . . . X . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  describe('given the preset is set to "boxes"', () => {
    beforeEach(() => {
      render(<App />);

      setPresetDropdown(screen.getByText("Boxes"));

      expect(getPresetDropdown().value).toBe("boxes");
    });

    it('sets preset back to "none"', () => {
      setPresetDropdown(screen.getByText("None"));

      expect(getPresetDropdown().value).toBe("none");
      expect(getBoardFromScreen()).toMatchBoard(`
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
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
      `);
    });
  });
});

describe("toggling cells", () => {
  it("sets a dead cell to alive on click", () => {
    render(<App />);

    setCell(1, 1);

    expect(getBoardFromScreen()).toMatchBoard(`
      . . . . . . . . . . . . . . .
      . X . . . . . . . . . . . . .
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
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `);
  });

  describe("given a single living cell", () => {
    beforeEach(() => {
      render(<App />);
      setCell(2, 2);
    });

    it("sets an alive cell to dead on click", () => {
      setCell(2, 2);

      expect(getBoardFromScreen()).toMatchBoard(`
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
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
      `);
    });

    it("does not toggle the alive cell if a dead cell clicked first", () => {
      fireEvent.mouseDown(getCell(2, 1));
      fireEvent.mouseOver(getCell(2, 2));
      fireEvent.mouseUp(getCell(2, 2));

      expect(getBoardFromScreen()).toMatchBoard(`
        . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . .
        . X X . . . . . . . . . . . .
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
        . . . . . . . . . . . . . . .
      `);
    });
  });
});

describe("slider", () => {
  it("initially sets the slider speed to 0.05s", () => {
    render(<App />);

    expect(screen.getByRole("slider").value).toEqual("0.05");
    expect(screen.getByRole("slider").parentNode).toHaveTextContent("0.05s");
  });

  it("sets the slider speed", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.1 },
    });
    expect(screen.getByRole("slider").value).toEqual("0.1");
    expect(screen.getByRole("slider").parentNode).toHaveTextContent("0.1s");
  });
});

describe("given an oscillator set to speed 0.5s", () => {
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
    render(<App />);
    setCell(2, 3);
    setCell(3, 3);
    setCell(4, 3);

    fireEvent.change(screen.getByRole("slider"), {
      target: { value: 0.5 },
    });
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);
  });

  it("iterates forward on clicking the step button", () => {
    fireEvent.click(screen.getByTitle("Step Forward"));

    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);
  });

  it("iterates forward after 0.5s intervals", () => {
    fireEvent.click(screen.getByTitle("Start"));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);

    act(() => jest.advanceTimersByTime(500));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);

    act(() => jest.advanceTimersByTime(500));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);
  });

  it("stops iterating when Stop button clicked", () => {
    fireEvent.click(screen.getByTitle("Start"));
    expect(getBoardFromScreen()).toMatchBoard(initialBoard);

    act(() => jest.advanceTimersByTime(500));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);

    fireEvent.click(screen.getByTitle("Stop"));
    act(() => jest.advanceTimersByTime(500));
    expect(getBoardFromScreen()).toMatchBoard(oscillatedBoard);
  });

  it("hides the stop button when stopped", () => {
    expect(screen.queryByTitle("Stop")).not.toBeInTheDocument();
  });

  it("hides the start button when started", () => {
    fireEvent.click(screen.getByTitle("Start"));
    expect(screen.queryByTitle("Start")).not.toBeInTheDocument();
  });
});
