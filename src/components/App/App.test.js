import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { getGridFromScreen, getCell, setCell } from "../../testHelpers";
import presets from "../../constants/presets";

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

describe("given the app is in the initial state", () => {
  beforeEach(() => {
    render(<App />);
  });

  it('shows the "empty" preset by default', () => {
    expect(getPresetDropdown().value).toBe("empty");
    expect(getGridFromScreen()).toMatchGrid(`
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

  it("sets the grid to the next preset", () => {
    const nextPreset = presets[1];
    setPresetDropdown(screen.getByText(nextPreset.label));

    expect(getPresetDropdown().value).toBe(nextPreset.value);
    expect(getGridFromScreen()).toEqual(nextPreset.grid);
  });

  it("sets a dead cell to alive on click", () => {
    setCell(1, 1);

    expect(getGridFromScreen()).toMatchGrid(`
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

  it("sets the slider speed to 0.05s by default", () => {
    expect(screen.getByRole("slider").value).toEqual("0.05");
    expect(screen.getByRole("slider").parentNode).toHaveTextContent("0.05s");
  });

  describe("given a single living cell", () => {
    beforeEach(() => {
      setCell(2, 2);
    });

    it("sets an alive cell to dead on click", () => {
      setCell(2, 2);

      expect(getGridFromScreen()).toMatchGrid(`
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

      expect(getGridFromScreen()).toMatchGrid(`
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

    it("resets the preset on clicking reset", () => {
      fireEvent.click(screen.queryByTitle("Reset"));

      expect(getGridFromScreen()).toMatchGrid(`
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

describe("given an oscillator set to speed 0.5s", () => {
  const initialGrid = `
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
  const oscillatedGrid = `
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
    expect(getGridFromScreen()).toMatchGrid(initialGrid);
  });

  it("iterates forward on clicking the step button", () => {
    fireEvent.click(screen.getByTitle("Step Forward"));

    expect(getGridFromScreen()).toMatchGrid(oscillatedGrid);
  });

  it("iterates forward after 0.5s intervals", () => {
    fireEvent.click(screen.getByTitle("Start"));
    expect(getGridFromScreen()).toMatchGrid(initialGrid);

    act(() => jest.advanceTimersByTime(500));
    expect(getGridFromScreen()).toMatchGrid(oscillatedGrid);

    act(() => jest.advanceTimersByTime(500));
    expect(getGridFromScreen()).toMatchGrid(initialGrid);
  });

  it("stops iterating when Stop button clicked", () => {
    fireEvent.click(screen.getByTitle("Start"));
    expect(getGridFromScreen()).toMatchGrid(initialGrid);

    act(() => jest.advanceTimersByTime(500));
    expect(getGridFromScreen()).toMatchGrid(oscillatedGrid);

    fireEvent.click(screen.getByTitle("Stop"));
    act(() => jest.advanceTimersByTime(500));
    expect(getGridFromScreen()).toMatchGrid(oscillatedGrid);
  });
});
