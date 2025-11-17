// src/components/validation/ValidationStatus.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { ValidationStatus } from "./ValidationStatus";

describe("ValidationStatus", () => {
  const baseStatus = {
    nationalOk: false,
    judicialOk: false,
    scoringOk: false,
    running: false,
  };

  test("renders nothing if status is null", () => {
    const { container } = render(<ValidationStatus status={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("shows running icon when running is true", () => {
    render(<ValidationStatus status={{ ...baseStatus, running: true }} />);
    expect(screen.getAllByText("⏳").length).toBe(3);
  });

  test("shows check and x icons based on ok flags", () => {
    render(
      <ValidationStatus
        status={{
          nationalOk: true,
          judicialOk: false,
          scoringOk: true,
          running: false,
        }}
      />
    );

    // there should be 2 ✅ and 1 ❌
    const checks = screen.getAllByText("✅");
    const crosses = screen.getAllByText("❌");
    expect(checks.length).toBe(2);
    expect(crosses.length).toBe(1);
  });
});
