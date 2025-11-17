import { useTheme } from "../../theme/useTheme";

export function Card({ header, footer, children, style, ...rest }) {
  const t = useTheme();

  const cardStyle = {
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.lg,
    background: t.color.card,
    boxShadow: t.shadow.md,
    overflow: "hidden",
    display: "grid",
    alignSelf: "start",
    ...style,
  };

  return (
    <section style={cardStyle} {...rest}>
      {header && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: t.space(2),
            padding: t.space(4),
            borderBottom: `1px solid ${t.color.border}`,
            background: "#ffffff",
          }}
        >
          {header}
        </div>
      )}
      <div
        style={{
          padding: t.space(4),
          display: "grid",
          gap: t.space(3),
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            padding: t.space(4),
            borderTop: `1px solid ${t.color.border}`,
          }}
        >
          {footer}
        </div>
      )}
    </section>
  );
}
