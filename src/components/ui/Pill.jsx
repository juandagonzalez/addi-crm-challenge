import { useTheme } from "../../theme/useTheme";

export function Pill({ tone = "neutral", style, children, ...rest }) {
  const t = useTheme();

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: t.space(1),
    padding: "2px 10px",
    borderRadius: t.radius.pill,
    fontSize: t.font.size.sm,
    fontWeight: t.font.weight.semi,
    border: "1px solid",
  };

  const toneStyle =
    tone === "green"
      ? {
          color: t.color.successText,
          background: t.color.successBg,
          borderColor: t.color.successBorder,
        }
      : tone === "red"
      ? {
          color: t.color.dangerText,
          background: t.color.dangerBg,
          borderColor: t.color.dangerBorder,
        }
      : {
          color: t.color.neutralText,
          background: t.color.neutralBg,
          borderColor: t.color.neutralBorder,
        };

  return (
    <span style={{ ...baseStyle, ...toneStyle, ...style }} {...rest}>
      {children}
    </span>
  );
}
