import { fireEvent, render, screen } from "@testing-library/react";

import PresetDropdown from "./PresetDropdown";

const presetsOptions = [
  {
    value: "none",
    label: "None",
    grid: `.`,
  },
  {
    value: "full",
    label: "Full",
    grid: `X`,
  },
];

const getPresetDropdown = () => screen.getByLabelText(/Choose Preset/);

const setPresetDropdown = (option) =>
  fireEvent.change(getPresetDropdown(), {
    target: { value: option.value },
  });

it("shows the preset options", () => {
  render(<PresetDropdown preset="none" presetOptions={presetsOptions} />);
  expect(
    screen.getAllByRole("option").map((option) => option.textContent)
  ).toEqual(["None", "Full"]);
});

it("sets the selected preset option", () => {
  render(<PresetDropdown preset="full" presetOptions={presetsOptions} />);
  expect(getPresetDropdown().value).toBe("full");
});

it("triggers the callback on selecting an option", () => {
  const onSetPresetSpy = jest.fn();
  render(
    <PresetDropdown
      preset="none"
      presetOptions={presetsOptions}
      onSetPreset={onSetPresetSpy}
    />
  );

  setPresetDropdown(screen.getByText("Full"));

  expect(onSetPresetSpy).toHaveBeenCalledWith("full");
});
