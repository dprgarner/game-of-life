import presets from "../../constants/presets";

const Controls = ({
  inProgress,
  onSetInProgress,
  onStepForward,
  speed,
  onSetSpeed,
  preset,
  onSetPreset,
}) => {
  return (
    <>
      <button onClick={onStepForward} title="Step Forward">
        {"⏭️"}
      </button>
      {!inProgress && (
        <button onClick={() => onSetInProgress(true)} title="Start">
          {"▶️"}
        </button>
      )}
      {inProgress && (
        <button onClick={() => onSetInProgress(false)} title="Stop">
          {"⏸️"}
        </button>
      )}
      <label>
        <input
          type="range"
          min={0.05}
          max={1}
          step={0.05}
          value={speed}
          onChange={(e) => onSetSpeed(parseFloat(e.currentTarget.value))}
        />
        {`${speed}s`}
      </label>

      <label>
        Choose Preset:
        <select
          value={preset}
          onChange={(e) => {
            onSetPreset(e.target.value);
          }}
        >
          {presets.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Controls;
