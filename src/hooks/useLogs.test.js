import { renderHook, act } from "@testing-library/react";
import { useLogs } from "./useLogs";

describe("useLogs", () => {
  test("adds and clears log lines", () => {
    const { result } = renderHook(() => useLogs());

    act(() => {
      result.current.log("First");
      result.current.log("Second");
    });

    expect(result.current.logLines.length).toBe(2);
    expect(result.current.logLines[0]).toMatch(/First/);

    act(() => {
      result.current.clearLogs();
    });

    expect(result.current.logLines.length).toBe(0);
  });
});
