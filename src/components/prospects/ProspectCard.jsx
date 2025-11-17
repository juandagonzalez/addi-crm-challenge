import { useTheme } from "../../theme/useTheme";
import { Pill } from "../ui/Pill";

export function ProspectCard({ prospect }) {
  const t = useTheme();

  const rowStyle = {
    display: "grid",
    gap: t.space(4),
    alignItems: "center",
    padding: t.space(3),
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.md,
    background: "#fff",
    fontSize: t.font.size.sm,
  };

  return (
    <div style={rowStyle} className="r-row">
      <div>
        <div
          style={{
            fontSize: t.font.size.base,
            fontWeight: t.font.weight.semi,
          }}
        >
          {prospect.firstName} {prospect.lastName}
        </div>
        <div
          style={{
            fontSize: t.font.size.xs,
            color: t.color.textMuted,
            marginTop: 4,
          }}
        >
          National ID: {prospect.nationalId}
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
          }}
        >
          Birthdate
        </div>
        <div style={{ fontSize: t.font.size.sm }}>{prospect.birthdate}</div>
      </div>

      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
          }}
        >
          Email
        </div>
        <div>{prospect.email}</div>
      </div>

      <div>
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
            marginBottom: 4,
          }}
        >
          Score
        </div>
        <Pill tone={prospect.score > 60 ? "green" : "red"}>
          {prospect.score}
        </Pill>
      </div>

      <div>
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
            marginBottom: 4,
          }}
        >
          Status
        </div>
        <Pill tone="green">Prospect</Pill>
      </div>
    </div>
  );
}
