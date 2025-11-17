import { renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  test("returns a stable object with design tokens", () => {
    const { result, rerender } = renderHook(() => useTheme());
    const first = result.current;

    expect(first).toHaveProperty("color");
    expect(first).toHaveProperty("radius");
    expect(first).toHaveProperty("shadow");
    expect(first).toHaveProperty("space");
    expect(first).toHaveProperty("font");
    expect(first).toHaveProperty("bp");

    rerender();
    const second = result.current;
    expect(second).toBe(first);
  });

  test("space function outputs 4px steps", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.space(1)).toBe("4px");
    expect(result.current.space(2)).toBe("8px");
  });
});
