import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MiniCRM from "./MiniCRM";

describe("MiniCRM", () => {
  test("renders leads and prospects sections", () => {
    render(<MiniCRM />);

    expect(screen.getByText(/ADDI CRM/i)).toBeInTheDocument();

    // be explicit: use the headings by their IDs/labels instead of generic "Leads"
    const leadsHeading = screen.getByRole("heading", { name: /leads/i });
    const prospectsHeading = screen.getByRole("heading", {
      name: /prospects/i,
    });

    expect(leadsHeading).toBeInTheDocument();
    expect(prospectsHeading).toBeInTheDocument();
  });

  test("opens and closes new lead modal", () => {
    render(<MiniCRM />);

    fireEvent.click(screen.getByRole("button", { name: /add lead/i }));
    expect(screen.getByText(/Add New Lead/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText(/Add New Lead/i)).not.toBeInTheDocument();
  });

  test("adds a new lead via the form", () => {
    render(<MiniCRM />);

    fireEvent.click(screen.getByRole("button", { name: /add lead/i }));

    fireEvent.change(screen.getByLabelText(/National ID/i), {
      target: { value: "N-123" },
    });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "New" },
    });
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Lead" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "new@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /submit lead/i })
    );

    expect(
      screen.queryByText(/Add New Lead/i)
    ).not.toBeInTheDocument();

    // confirm the new lead's name appears
    expect(screen.getByText(/New Lead/)).toBeInTheDocument();
  });
});