import { useEffect, useRef } from "react";

import "./Grid.css";

const Grid = ({ cells, onCellClick }) => {
  const isMouseDown = useRef(false);
  const isCreatingCells = useRef(false);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      isMouseDown.current = false;
    });
  }, []);

  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {cells.map((row, i) => (
            <tr key={i} className="grid-row" data-testid="row">
              {row.map((cell, j) => (
                <td
                  key={j}
                  data-testid="cell"
                  className={`grid-cell ${cell ? "alive" : ""}`}
                  onMouseDown={() => {
                    isMouseDown.current = true;
                    isCreatingCells.current = !cell;
                    onCellClick(i, j, isCreatingCells.current);
                  }}
                  onMouseOver={() => {
                    if (isMouseDown.current) {
                      onCellClick(i, j, isCreatingCells.current);
                    }
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
