import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(10); // Timer starts at 10 seconds
  const [timerActive, setTimerActive] = useState(false);
  const inputRef = useRef(null); // Reference for focusing the input box
  const timerRef = useRef(null); // Reference for timer ID

  // Start the countdown
  const startTimer = () => {
    if (timerActive) return;
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerRef.current);
          setTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimerActive(false);
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(10);
    setTimerActive(false);
  };

  // Focus the input box
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="app">
      <div className="content">
        {/* Input Box and Focus Button */}
        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type something here..."
            className="input-box"
            autoFocus
          />
          <button className="btn focus-btn" onClick={focusInput}>
            Focus Box
          </button>
        </div>

        {/* Timer Display and Buttons */}
        <div className="timer-section">
          <div className={`timer ${time === 0 ? "time-up" : ""}`}>
            {time === 0 ? "Time's Up!" : time}
          </div>
          <div className="button-group">
            <button className="btn start-btn" onClick={startTimer} disabled={timerActive}>
              Start Timer
            </button>
            <button className="btn stop-btn" onClick={stopTimer}>
              Stop Timer
            </button>
            <button className="btn reset-btn" onClick={resetTimer}>
              Reset Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;