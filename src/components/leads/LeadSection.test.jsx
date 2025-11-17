// src/components/leads/LeadsSection.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadsSection } from "./LeadsSection";

describe("LeadsSection", () => {
  const leads = [
    {
      id: "L-1",
      nationalId: "N-123",
      birthdate: "1990-01-01",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      validationFailures: 0,
    },
  ];

  const busyMap = { "L-1": "idle" };
  const validationStatusMap = {};
  const noop = () => {};

  test("renders no leads message when empty", () => {
    render(
      <LeadsSection
        leads={[]}
        busyMap={{}}
        validationStatusMap={{}}
        anyValidating={false}
        onValidateLead={noop}
        onValidateAll={noop}
        onOpenNewLeadModal={noop}
      />
    );

    expect(screen.getByText(/No leads. Add one above./i)).toBeInTheDocument();
  });

  test("shows leads count badge", () => {
    render(
      <LeadsSection
        leads={leads}
        busyMap={busyMap}
        validationStatusMap={validationStatusMap}
        anyValidating={false}
        onValidateLead={noop}
        onValidateAll={noop}
        onOpenNewLeadModal={noop}
      />
    );

    expect(screen.getByText(/1 total/)).toBeInTheDocument();
  });

  test("calls onOpenNewLeadModal when Add Lead clicked", () => {
    const onOpenNewLeadModal = jest.fn();
    render(
      <LeadsSection
        leads={leads}
        busyMap={busyMap}
        validationStatusMap={validationStatusMap}
        anyValidating={false}
        onValidateLead={noop}
        onValidateAll={noop}
        onOpenNewLeadModal={onOpenNewLeadModal}
      />
    );

    const btn = screen.getByRole("button", { name: /add lead/i });
    fireEvent.click(btn);
    expect(onOpenNewLeadModal).toHaveBeenCalled();
  });

  test("disables Validate All when no leads", () => {
    render(
      <LeadsSection
        leads={[]}
        busyMap={{}}
        validationStatusMap={{}}
        anyValidating={false}
        onValidateLead={noop}
        onValidateAll={noop}
        onOpenNewLeadModal={noop}
      />
    );

    const btn = screen.getByRole("button", { name: /validate all/i });
    expect(btn).toBeDisabled();
  });
});
