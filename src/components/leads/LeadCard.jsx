import { useTheme } from "../../theme/useTheme";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { ValidationStatus } from "../validation/ValidationStatus";

export function LeadCard({ lead, busy, validationStatus, onValidate }) {
  const t = useTheme();

  const rowStyle = {
    display: "grid",
    gap: t.space(4),
    alignItems: "center",
    padding: t.space(3),
    border: `1px solid ${t.color.border}`,
    borderRadius: t.radius.md,
    background: "#fff",
    fontSize: t.font.size.sm
  };

  return (
    <div
      style={rowStyle}
      className="r-row"
      aria-label={`Lead ${lead.firstName} ${lead.lastName}`}
    >
      <div>
        <div
          style={{
            fontSize: t.font.size.base,
            fontWeight: t.font.weight.semi,
          }}
        >
          {lead.firstName} {lead.lastName}
        </div>
        <div
          style={{
            fontSize: t.font.size.xs,
            color: t.color.textMuted,
            marginTop: 4,
          }}
        >
          National ID: {lead.nationalId}
        </div>

        {lead.validationFailures > 0 && (
          <div style={{ marginTop: 8 }}>
            <Pill tone="red">
              Validations Failed: {lead.validationFailures}
            </Pill>
          </div>
        )}

        <ValidationStatus status={validationStatus} />
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
        <div style={{ fontSize: t.font.size.sm }}>{lead.birthdate}</div>
      </div>

      <div className="lead-email">
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
          }}
        >
          Email
        </div>
        <div>{lead.email}</div>
      </div>

      <div>
        <Button
          variant="primary"
          disabled={busy}
          onClick={onValidate}
          aria-busy={busy}
          aria-label={`Validate lead ${lead.firstName} ${lead.lastName}`}
        >
          {busy ? "Validating…" : "Validate"}
        </Button>
      </div>
    </div>
  );
}
