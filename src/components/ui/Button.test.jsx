import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders children and handles click", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const btn = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("respects disabled prop", () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );

    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
