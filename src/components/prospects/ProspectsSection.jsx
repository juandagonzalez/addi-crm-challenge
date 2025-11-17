import { useTheme } from "../../theme/useTheme";
import { Card } from "../layout/Card";
import { ProspectCard } from "./ProspectCard";

export function ProspectsSection({ prospects }) {
  const t = useTheme();

  const listStyle = {
    display: "grid",
    gap: t.space(2),
  };

  const helpTextStyle = {
    color: t.color.textMuted,
    fontSize: t.font.size.sm,
    lineHeight: 1.5,
  };

  const footerNoteStyle = {
    color: t.color.textMuted,
    fontSize: t.font.size.sm,
    lineHeight: 1.5,
  };

  const badgeStyle = {
    gap: t.space(1),
    fontSize: t.font.size.sm,
    color: t.color.textMuted,
  };

  const header = (
    <>
      <div>
        <h2
          id="prospects-title"
          style={{
            fontWeight: t.font.weight.semi,
            fontSize: t.font.size.lg,
            margin: 0,
          }}
        >
          Prospects
        </h2>
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
            lineHeight: 1.5,
          }}
        >
          Leads that passed all validations are promoted here.
        </div>
      </div>
    </>
  );

  const footer = (
    <div style={footerNoteStyle}>
      Prospects are created only when the national registry, judicial records,
      and internal scoring validations all pass.
    </div>
  );

  return (
    <Card aria-labelledby="prospects-title" header={header} footer={footer}>
      <div style={badgeStyle}>{prospects.length} total</div>
      <div style={listStyle}>
        {prospects.map((p) => (
          <ProspectCard key={p.prospectId} prospect={p} />
        ))}
        {prospects.length === 0 && (
          <div style={helpTextStyle}>No prospects yet.</div>
        )}
      </div>
    </Card>
  );
}
