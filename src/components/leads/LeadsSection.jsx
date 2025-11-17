import { useTheme } from "../../theme/useTheme";
import { Card } from "../layout/Card";
import { Button } from "../ui/Button";
import { LeadCard } from "./LeadCard";

export function LeadsSection({
  leads,
  busyMap,
  validationStatusMap,
  anyValidating,
  onValidateLead,
  onValidateAll,
  onOpenNewLeadModal,
}) {
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

  const badgeStyle = {
    gap: t.space(1),
    fontSize: t.font.size.sm,
    color: t.color.textMuted,
  };

  const header = (
    <>
      <div>
        <h2
          id="leads-title"
          style={{
            fontWeight: t.font.weight.semi,
            fontSize: t.font.size.lg,
            margin: 0,
          }}
        >
          Leads
        </h2>
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
            lineHeight: 1.5,
          }}
        >
          Use the “Add Lead” button below to create a new lead. Then validate
          each lead to promote them to prospects.
        </div>
        <div
          style={{
            display: "flex",
            gap: t.space(2),
            margin: "10px 0",
          }}
        >
          <Button variant="primary" onClick={onOpenNewLeadModal}>
            Add Lead
          </Button>
          <Button
            variant="default"
            disabled={!leads.length || anyValidating}
            onClick={onValidateAll}
          >
            {anyValidating ? "Validating…" : "Validate All"}
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Card aria-labelledby="leads-title" header={header}>
      <div style={badgeStyle}>{leads.length} total</div>
      <div style={listStyle} aria-live="polite">
        {leads.map((lead) => {
          const busy = busyMap[lead.id] === "validating";
          const vStatus = validationStatusMap[lead.id];

          return (
            <LeadCard
              key={lead.id}
              lead={lead}
              busy={busy}
              validationStatus={vStatus}
              onValidate={() => onValidateLead(lead.id)}
            />
          );
        })}
        {leads.length === 0 && (
          <div style={helpTextStyle}>No leads. Add one above.</div>
        )}
      </div>
    </Card>
  );
}
