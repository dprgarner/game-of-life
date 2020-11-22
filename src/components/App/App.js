import { useEffect, useState } from "react";

import { iterate } from "../../gameOfLife";
import presets from "../../constants/presets";

import Grid from "../Grid";
import Controls from "../Controls";

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
      <Controls
        preset={preset}
        onSetPreset={updatePreset}
        inProgress={inProgress}
        onSetInProgress={setInProgress}
        speed={speed}
        onSetSpeed={setSpeed}
        onStepForward={() => setCells(iterate(cells))}
      />
    </div>
  );
}

export default App;
