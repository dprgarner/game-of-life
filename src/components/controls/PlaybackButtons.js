const PlaybackButtons = ({ isRunning, onStart, onStop, onStepForward }) => {
  return (
    <>
      {isRunning ? (
        <button onClick={onStop} title="Stop">
          {"⏸️"}
        </button>
      ) : (
        <button onClick={onStart} title="Start">
          {"▶️"}
        </button>
      )}

      <button onClick={onStepForward} title="Step Forward">
        {"⏭️"}
      </button>
    </>
  );
};

export default PlaybackButtons;
