import { fireEvent, render, screen } from "@testing-library/react";

import SpeedSlider from "./SpeedSlider";

it("sets the slider value to the speed prop", () => {
  render(<SpeedSlider speed={0.5} />);

  expect(screen.getByRole("slider").value).toEqual("0.5");
});

it("sets the slider label to the speed prop", () => {
  render(<SpeedSlider speed={0.5} />);

  expect(screen.getByRole("slider").parentNode).toHaveTextContent("0.5s");
});

it("calls the callback on changing the slider", () => {
  const onSetSpeedSpy = jest.fn();
  render(<SpeedSlider speed={0.5} onSetSpeed={onSetSpeedSpy} />);

  fireEvent.change(screen.getByRole("slider"), {
    target: { value: 0.1 },
  });

  expect(onSetSpeedSpy).toHaveBeenCalledWith(0.1);
});
