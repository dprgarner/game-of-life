import "./SpeedSlider.css";

const SpeedSlider = ({ speed, onSetSpeed }) => (
  <label className="speed-slider">
    Tick Speed:
    <input
      className="speed-slider-input"
      type="range"
      min={0.05}
      max={1}
      step={0.05}
      value={speed}
      onChange={(e) => onSetSpeed(parseFloat(e.currentTarget.value))}
    />
    {`${speed}s`}
  </label>
);

export default SpeedSlider;
