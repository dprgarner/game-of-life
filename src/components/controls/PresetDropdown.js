import "./PresetDropdown.css";

const PresetDropdown = ({ presetOptions, preset, onSetPreset }) => (
  <div className="preset-dropdown">
    <label>
      Choose Preset:
      <select
        className="preset-dropdown-select"
        value={preset}
        onChange={(e) => {
          onSetPreset(e.target.value);
        }}
      >
        {presetOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default PresetDropdown;
