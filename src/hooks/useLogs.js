import { useCallback, useReducer } from "react";

function logsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "clear":
      return [];
    default:
      return state;
  }
}

export function useLogs() {
  const [logLines, dispatch] = useReducer(logsReducer, []);

  const log = useCallback((msg) => {
    const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
    dispatch({ type: "add", payload: line });
  }, []);

  const clearLogs = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  return { logLines, log, clearLogs };
}
