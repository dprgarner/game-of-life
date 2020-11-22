import "./PlaybackButtons.css";

const PlaybackButtons = ({
  isRunning,
  onStart,
  onStop,
  onStepForward,
  onReset,
}) => {
  return (
    <div>
      <button onClick={onReset} title="Reset" className="playback-button">
        {"🔁"}
      </button>

      {isRunning ? (
        <button onClick={onStop} title="Stop" className="playback-button">
          {"⏸️"}
        </button>
      ) : (
        <button onClick={onStart} title="Start" className="playback-button">
          {"▶️"}
        </button>
      )}

      <button
        onClick={onStepForward}
        title="Step Forward"
        className="playback-button"
      >
        {"⏭️"}
      </button>
    </div>
  );
};

export default PlaybackButtons;
