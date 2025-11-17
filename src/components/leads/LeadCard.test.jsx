import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadCard } from "./LeadCard";

describe("LeadCard", () => {
  const lead = {
    id: "L-1",
    nationalId: "N-123",
    birthdate: "1990-01-01",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    validationFailures: 2,
  };

  const validationStatus = {
    nationalOk: true,
    judicialOk: false,
    scoringOk: true,
    running: false,
  };

  test("renders lead info and failures pill", () => {
    render(
      <LeadCard
        lead={lead}
        busy={false}
        validationStatus={validationStatus}
        onValidate={() => {}}
      />
    );

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(
      screen.getByText(/National ID: N-123/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Validations Failed: 2/)
    ).toBeInTheDocument();
  });

  test("fires onValidate when button clicked and not busy", () => {
    const onValidate = jest.fn();
    render(
      <LeadCard
        lead={lead}
        busy={false}
        validationStatus={validationStatus}
        onValidate={onValidate}
      />
    );

    const btn = screen.getByRole("button", { name: /validate/i });
    fireEvent.click(btn);
    expect(onValidate).toHaveBeenCalledTimes(1);
  });

  test("disables button when busy", () => {
    render(
      <LeadCard
        lead={lead}
        busy={true}
        validationStatus={validationStatus}
        onValidate={() => {}}
      />
    );

    const btn = screen.getByRole("button", {
      name: /validate lead john doe/i,
    });
    expect(btn).toBeDisabled();
  });
});