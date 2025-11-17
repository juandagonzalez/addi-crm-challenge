import { render, screen } from "@testing-library/react";
import { ProspectsSection } from "./ProspectsSection";

describe("ProspectsSection", () => {
  const prospects = [
    {
      prospectId: "P-1",
      nationalId: "N-123",
      birthdate: "1990-01-01",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      score: 70,
      createdAt: "2020-01-01T00:00:00.000Z",
    },
  ];

  test("renders empty message when no prospects", () => {
    render(<ProspectsSection prospects={[]} />);
    expect(screen.getByText(/No prospects yet./i)).toBeInTheDocument();
  });

  test("shows prospects count", () => {
    render(<ProspectsSection prospects={prospects} />);
    expect(screen.getByText(/1 total/)).toBeInTheDocument();
  });
});
