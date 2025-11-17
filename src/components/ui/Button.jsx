import { useTheme } from "../../theme/useTheme";

export function Button({
  variant = "default",
  disabled = false,
  style,
  children,
  ...rest
}) {
  const t = useTheme();

  const baseStyle = {
    cursor: "pointer",
    borderRadius: t.radius.md,
    padding: `${t.space(2)} ${t.space(3)}`,
    border: "1px solid",
    fontWeight: t.font.weight.semi,
    transition: "transform 100ms, box-shadow 120ms, background 120ms",
    fontSize: t.font.size.sm,
    outline: "none",
  };

  const variants = {
    primary: {
      borderColor: t.color.primary,
      background: t.color.primary,
      color: "#fff",
      boxShadow: t.shadow.sm,
    },
    default: {
      borderColor: t.color.neutralBorder,
      background: "#fff",
      color: t.color.text,
      boxShadow: "none",
    },
    ghost: {
      borderColor: "transparent",
      background: "transparent",
      color: t.color.text,
      boxShadow: "none",
    },
  };

  const hoverVariants = {
    primary: {
      transform: "translateY(-1px)",
      background: t.color.primaryDark,
    },
    default: {
      transform: "translateY(-1px)",
      background: t.color.neutralBg,
    },
    ghost: {
      transform: "translateY(-1px)",
      background: t.color.neutralBg,
    },
  };

  const disabledStyle = {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  };

  const variantStyle = variants[variant] || variants.default;
  const finalStyle = {
    ...baseStyle,
    ...variantStyle,
    ...(disabled ? disabledStyle : null),
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    const hv = hoverVariants[variant] || hoverVariants.default;
    Object.assign(e.currentTarget.style, finalStyle, hv);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.currentTarget.style, finalStyle);
  };

  return (
    <button
      type="button"
      style={finalStyle}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </button>
  );
}
