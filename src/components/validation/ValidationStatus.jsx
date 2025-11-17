import { useTheme } from "../../theme/useTheme";
import { Pill } from "../ui/Pill";

export function ValidationStatus({ status }) {
  const t = useTheme();

  if (!status) return null;

  const icon = (ok, running) => {
    if (running) return "⏳";
    return ok ? "✅" : "❌";
  };

  const containerStyle = {
    marginTop: t.space(3),
    padding: t.space(2),
    borderRadius: t.radius.md,
    background: t.color.neutralBg,
    border: `1px solid ${t.color.neutralBorder}`,
    display: "grid",
    gap: t.space(2),
  };

  const titleStyle = {
    fontSize: t.font.size.xs,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: t.color.textMuted,
  };

  const stepsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: t.space(1.5),
  };

  const pillStyle = {
    padding: "2px 8px",
    fontSize: t.font.size.xs,
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Validations</div>
      <div style={stepsStyle}>
        <Pill tone="neutral" style={pillStyle}>
          <span>{icon(status.nationalOk, status.running)}</span>
          <span>National Registry</span>
        </Pill>
        <Pill tone="neutral" style={pillStyle}>
          <span>{icon(status.judicialOk, status.running)}</span>
          <span>Judicial Records</span>
        </Pill>
        <Pill tone="neutral" style={pillStyle}>
          <span>{icon(status.scoringOk, status.running)}</span>
          <span>Internal Scoring</span>
        </Pill>
      </div>
    </div>
  );
}
