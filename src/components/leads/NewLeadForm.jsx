import { useState } from "react";
import { useTheme } from "../../theme/useTheme";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function NewLeadForm({ onSubmit, onCancel }) {
  const t = useTheme();

  const [form, setForm] = useState({
    nationalId: "",
    birthdate: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    if (!form.nationalId) nextErrors.nationalId = "Required";
    if (!form.birthdate) nextErrors.birthdate = "Required";
    if (!form.firstName) nextErrors.firstName = "Required";
    if (!form.lastName) nextErrors.lastName = "Required";
    if (!form.email) nextErrors.email = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) {
      onSubmit(form);
    }
  };

  const errorTextStyle = {
    color: t.color.dangerText,
    fontSize: t.font.size.xs,
  };

  const bodyStyle = {
    display: "grid",
    gap: t.space(3),
  };

  const gridInputs = {
    display: "grid",
    gap: t.space(3),
    gridTemplateColumns: "1fr",
  };

  return (
    <form onSubmit={handleSubmit} style={bodyStyle}>
      <div className="r-inputs" style={gridInputs}>
        <div>
          <Input
            id="nationalId"
            type="text"
            inputmode="numeric"
            pattern="\d{10}"
            minlength="10"
            maxlength="10"
            label="National ID"
            placeholder="National ID"
            value={form.nationalId}
            onChange={handleChange("nationalId")}
          />
          {errors.nationalId && (
            <div style={errorTextStyle}>{errors.nationalId}</div>
          )}
        </div>
        <div>
          <Input
            id="birthdate"
            type="date"
            label="Birthdate"
            value={form.birthdate}
            onChange={handleChange("birthdate")}
          />
          {errors.birthdate && (
            <div style={errorTextStyle}>{errors.birthdate}</div>
          )}
        </div>
        <div>
          <Input
            id="firstName"
            label="First name"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange("firstName")}
          />
          {errors.firstName && (
            <div style={errorTextStyle}>{errors.firstName}</div>
          )}
        </div>
        <div>
          <Input
            id="lastName"
            label="Last name"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange("lastName")}
          />
          {errors.lastName && (
            <div style={errorTextStyle}>{errors.lastName}</div>
          )}
        </div>
        <div>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange("email")}
          />
          {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: t.space(2),
        }}
      >
        <Button variant="ghost" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit Lead
        </Button>
      </div>
    </form>
  );
}
