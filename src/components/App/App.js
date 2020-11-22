import { useEffect, useState } from "react";

import { iterate } from "../../gameOfLife";
import presets from "../../constants/presets";

import Grid from "../Grid";
import PlaybackButtons from "../controls/PlaybackButtons";
import PresetDropdown from "../controls/PresetDropdown";
import SpeedSlider from "../controls/SpeedSlider";

import "./App.css";

function App() {
  const [preset, setPreset] = useState(presets[0].value);
  const [cells, setCells] = useState(presets[0].grid);
  const [speed, setSpeed] = useState(0.05);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCells(iterate);
      }, speed * 1000);

      return () => clearInterval(interval);
    }
  }, [speed, isRunning]);

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

      <PresetDropdown
        presetOptions={presets}
        preset={preset}
        onSetPreset={updatePreset}
      />
      <SpeedSlider speed={speed} onSetSpeed={setSpeed} />
      <PlaybackButtons
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onStepForward={() => setCells(iterate(cells))}
      />
    </div>
  );
}

export default App;
