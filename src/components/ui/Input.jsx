import { useState } from "react";
import { useTheme } from "../../theme/useTheme";

export function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  ...rest
}) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);

  const labelStyle = {
    fontSize: t.font.size.sm,
    color: t.color.textMuted,
  };

  const baseStyle = {
    padding: `${t.space(2)} ${t.space(3)}`,
    borderRadius: t.radius.md,
    border: `1px solid ${t.color.neutralBorder}`,
    background: "#fff",
    fontSize: t.font.size.base,
    outline: "none",
    transition: "box-shadow 120ms, border-color 120ms, background 120ms",
  };

  const focusStyle = focused
    ? {
        boxShadow:
          "0 0 0 3px rgba(12,60,255,0.14), 0 0 0 1px rgba(12,60,255,0.35)",
        borderColor: t.color.primary,
      }
    : null;

  return (
    <div style={{ display: "grid", gap: t.space(1) }}>
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        style={{ ...baseStyle, ...focusStyle }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </div>
  );
}
