import { render, fireEvent, screen } from "@testing-library/react";

import PlaybackButtons from "./PlaybackButtons";

it("hides the stop button when stopped", () => {
  render(<PlaybackButtons isRunning={false} />);

  expect(screen.queryByTitle("Start")).toBeInTheDocument();
  expect(screen.queryByTitle("Stop")).not.toBeInTheDocument();
});

it("triggers onStart callback on clicking start", () => {
  const onStartSpy = jest.fn();
  render(<PlaybackButtons isRunning={false} onStart={onStartSpy} />);

  fireEvent.click(screen.queryByTitle("Start"));
  expect(onStartSpy).toHaveBeenCalled();
});

it("hides the start button when started", () => {
  render(<PlaybackButtons isRunning />);

  expect(screen.queryByTitle("Start")).not.toBeInTheDocument();
  expect(screen.queryByTitle("Stop")).toBeInTheDocument();
});

it("triggers onStop callback on clicking stop", () => {
  const onStopSpy = jest.fn();
  render(<PlaybackButtons isRunning onStop={onStopSpy} />);

  fireEvent.click(screen.queryByTitle("Stop"));
  expect(onStopSpy).toHaveBeenCalled();
});

it("triggers onStepForward callback on clicking step forward", () => {
  const onStepForwardSpy = jest.fn();
  render(<PlaybackButtons onStepForward={onStepForwardSpy} />);

  fireEvent.click(screen.queryByTitle("Step Forward"));
  expect(onStepForwardSpy).toHaveBeenCalled();
});

it("triggers onReset callback on clicking reset", () => {
  const onResetSpy = jest.fn();
  render(<PlaybackButtons onReset={onResetSpy} />);

  fireEvent.click(screen.queryByTitle("Reset"));
  expect(onResetSpy).toHaveBeenCalled();
});
