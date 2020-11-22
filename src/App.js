import { useEffect, useState } from "react";

import Grid from "./Grid";
import { iterate } from "./gameOfLife";
import presets from "./presets";

import "./App.css";

function App() {
  const [preset, setPreset] = useState(presets[0].value);
  const [cells, setCells] = useState(presets[0].grid);
  const [speed, setSpeed] = useState(0.05);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (inProgress) {
      const interval = setInterval(() => {
        setCells(iterate);
      }, speed * 1000);

      return () => clearInterval(interval);
    }
  }, [speed, inProgress]);

  const updatePreset = (nextPreset) => {
    setPreset(nextPreset);
    setCells(presets.find(({ value }) => value === nextPreset).grid);
  };

  return (
    <div className="App">
      <Grid
        cells={cells}
        onCellClick={(setI, setJ, alive) =>
          setCells(
            cells.map((row, i) =>
              i === setI
                ? row.map((cell, j) => (j === setJ ? alive : cell))
                : row
            )
          )
        }
      />
      <button onClick={() => setCells(iterate(cells))} title="Step Forward">
        {"⏭️"}
      </button>
      {!inProgress && (
        <button onClick={() => setInProgress(true)} title="Start">
          {"▶️"}
        </button>
      )}
      {inProgress && (
        <button onClick={() => setInProgress(false)} title="Stop">
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
          onChange={(e) => setSpeed(parseFloat(e.currentTarget.value))}
        />
        {`${speed}s`}
      </label>

      <label>
        Choose Preset:
        <select
          value={preset}
          onChange={(e) => {
            updatePreset(e.target.value);
          }}
        >
          {presets.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default App;
