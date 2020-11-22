import { useEffect, useRef } from "react";
import "./Board.css";

const Board = ({ cells, onCellClick }) => {
  const isMouseDown = useRef(false);
  const isCreatingCells = useRef(false);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      isMouseDown.current = false;
    });
  }, []);

  return (
    <div className="board-container">
      <table className="board-table">
        <tbody>
          {cells.map((row, i) => (
            <tr key={i} className="board-row">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`board-cell ${cell ? "alive" : ""}`}
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

export default Board;
