// src/components/leads/NewLeadForm.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NewLeadForm } from "./NewLeadForm";

describe("NewLeadForm", () => {
  test("validates required fields and calls onSubmit with values", () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    render(<NewLeadForm onSubmit={onSubmit} onCancel={onCancel} />);

    // submit empty -> should show errors
    fireEvent.click(screen.getByRole("button", { name: /submit lead/i }));
    expect(screen.getAllByText(/Required/i).length).toBeGreaterThan(0);
    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/National ID/i), {
      target: { value: "N-123" },
    });
    fireEvent.change(screen.getByLabelText(/Birthdate/i), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit lead/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      nationalId: "N-123",
      birthdate: "1990-01-01",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  });

  test("calls onCancel when Cancel clicked", () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    render(<NewLeadForm onSubmit={onSubmit} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
