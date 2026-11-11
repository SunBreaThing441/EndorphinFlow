import { useState } from 'react';

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (mode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
  };
  const back = function () {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  return { mode: history[history.length - 1], transition, back };
}
