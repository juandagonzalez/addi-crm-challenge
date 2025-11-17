import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  test("renders label and passes value/changes", () => {
    const onChange = jest.fn();
    render(
      <Input
        id="field"
        label="Field label"
        value="initial"
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText("Field label")).toBeInTheDocument();
    const input = screen.getByLabelText("Field label");
    expect(input.value).toBe("initial");

    fireEvent.change(input, { target: { value: "changed" } });
    expect(onChange).toHaveBeenCalled();
  });
});
