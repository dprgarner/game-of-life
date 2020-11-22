import presets from "../../constants/presets";

const PresetDropdown = ({ preset, onSetPreset }) => (
  <>
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

export default PresetDropdown;
