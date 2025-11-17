import { render, screen } from "@testing-library/react";
import { Pill } from "./Pill";

describe("Pill", () => {
  test("renders content", () => {
    render(<Pill>Some text</Pill>);
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });

  test("supports tone prop", () => {
    const { rerender } = render(<Pill tone="green">Green</Pill>);
    expect(screen.getByText("Green")).toBeInTheDocument();

    rerender(<Pill tone="red">Red</Pill>);
    expect(screen.getByText("Red")).toBeInTheDocument();

    rerender(<Pill tone="neutral">Neutral</Pill>);
    expect(screen.getByText("Neutral")).toBeInTheDocument();
  });
});
