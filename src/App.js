import { useEffect, useState } from "react";

import "./App.css";
import Board from "./Board";
import { iterate, parseBoard } from "./game";

function App() {
  const [cells, setCells] = useState(
    parseBoard(`
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . X X . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . .
    `)
  );
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

  return (
    <div className="App">
      <Board
        cells={cells}
        onCellClick={(setI, setJ) =>
          setCells(
            cells.map((row, i) =>
              i === setI
                ? row.map((cell, j) => (j === setJ ? !cell : cell))
                : row
            )
          )
        }
      />
      <button onClick={() => setCells(iterate(cells))} title="Step Forward">
        {"| |>"}
      </button>
      <button onClick={() => setInProgress(true)} title="Start">
        {"|>"}
      </button>
      <button onClick={() => setInProgress(false)} title="Stop">
        {"[ ]"}
      </button>

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
    </div>
  );
}

export default App;
