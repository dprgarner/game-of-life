const Board = ({ cells, onCellClick }) => (
  <table>
    <tbody>
      {cells.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td
              key={j}
              className={cell ? "alive" : ""}
              onClick={() => onCellClick(i, j)}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Board;
