import { useMemo, useState, useCallback } from "react";
import "../styles/globals.css";

import { useTheme } from "../theme/useTheme";
import { useLogs } from "../hooks/useLogs";
import { useLeadValidation } from "../hooks/useLeadValidation";
import { LeadsSection } from "../components/leads/LeadsSection";
import { ProspectsSection } from "../components/prospects/ProspectsSection";
import { Modal } from "../components/ui/Modal";
import { NewLeadForm } from "../components/leads/NewLeadForm";

export default function MiniCRM() {
  const t = useTheme();
  const { logLines, log } = useLogs();
  const { busyMap, validationStatus, anyValidating, validateLead } =
    useLeadValidation(log);

  const initialLeads = useMemo(
    () => [
      {
        id: "L-001",
        nationalId: "ABC123456",
        birthdate: "1990-05-12",
        firstName: "Alice",
        lastName: "Wong",
        email: "alice@example.com",
        validationFailures: 0,
      },
      {
        id: "L-002",
        nationalId: "XYZ987654",
        birthdate: "1985-11-02",
        firstName: "Bob",
        lastName: "Martinez",
        email: "bob@example.com",
        validationFailures: 0,
      },
      {
        id: "L-003",
        nationalId: "JKL222333",
        birthdate: "1999-01-20",
        firstName: "Carla",
        lastName: "Suarez",
        email: "carla@example.com",
        validationFailures: 0,
      },
    ],
    []
  );

  const [leads, setLeads] = useState(initialLeads);
  const [prospects, setProspects] = useState([]);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);

  const pageStyle = {
    fontFamily: t.font.body,
    color: t.color.text,
    background: t.color.page,
    paddingInline: t.space(4),
    paddingBlock: t.space(4),
    boxSizing: "border-box",
  };

  const appStyle = {
    margin: "0 auto",
    maxWidth: 1200,
    display: "grid",
    gap: t.space(4),
    alignItems: "start",
  };

  const headerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: t.space(3),
    alignItems: "center",
  };

  const titleStackStyle = {
    display: "grid",
    gap: t.space(1),
  };

  const titleStyle = {
    fontSize: t.font.size.xxl,
    fontWeight: t.font.weight.bold,
    letterSpacing: "-0.02em",
  };

  const logoStyle = {
    maxWidth: "135px"
  };

  const subtitleStyle = {
    color: t.color.textMuted,
    fontSize: t.font.size.md,
    lineHeight: 1.4,
  };

  const mainStyle = {};

  const handleValidateLead = useCallback(
    (leadId) => {
      const lead = leads.find((l) => l.id === leadId);
      if (!lead) return;

      validateLead(
        lead,
        (score) => {
          setProspects((p) => [
            ...p,
            {
              ...lead,
              prospectId: `P-${lead.id}`,
              score,
              createdAt: new Date().toISOString(),
            },
          ]);
          setLeads((ls) => ls.filter((l) => l.id !== lead.id));
        },
        () => {
          setLeads((ls) =>
            ls.map((l) =>
              l.id === lead.id
                ? {
                    ...l,
                    validationFailures: (l.validationFailures || 0) + 1,
                  }
                : l
            )
          );
        }
      );
    },
    [leads, validateLead]
  );

  const handleValidateAll = useCallback(() => {
    if (!leads.length) return;
    leads.forEach((lead) => {
      if (busyMap[lead.id] !== "validating") {
        handleValidateLead(lead.id);
      }
    });
  }, [busyMap, leads, handleValidateLead]);

  const handleAddLead = useCallback(
    (newLeadInput) => {
      const id = `L-${String(Date.now()).slice(-6)}`;
      setLeads((ls) => [
        ...ls,
        {
          id,
          ...newLeadInput,
          validationFailures: 0,
        },
      ]);
      if (log) {
        log(`Added lead ${id}`);
      }
      setIsNewLeadOpen(false);
    },
    [log]
  );

  const logsContainerStyle = {
    marginTop: t.space(2),
    fontFamily: t.font.mono,
    fontSize: t.font.size.xs,
    background: t.color.consoleBg,
    color: t.color.consoleText,
    borderRadius: t.radius.md,
    padding: t.space(2),
    maxHeight: 200,
    overflowY: "auto",
  };

  return (
    <div style={pageStyle}>
      <div style={appStyle} className="r-grid">
        <header style={headerStyle}>
          <div style={titleStackStyle}>
            <img style={logoStyle} src="https://colombiafintech.co/wp-content/uploads/2025/03/Adelante-Soluciones-Financieras-Addi.png" />
            <div style={titleStyle}>ADDI CRM</div>
            <div style={subtitleStyle}>
              Validate your leads before turning them into prospects
            </div>
          </div>
        </header>

        <main className="r-cols" style={mainStyle}>
          <LeadsSection
            leads={leads}
            busyMap={busyMap}
            validationStatusMap={validationStatus}
            anyValidating={anyValidating}
            onValidateLead={handleValidateLead}
            onValidateAll={handleValidateAll}
            onOpenNewLeadModal={() => setIsNewLeadOpen(true)}
          />
          <ProspectsSection prospects={prospects} />
        </main>

        {logLines.length > 0 && (
          <section aria-label="Activity log">
            <div
              style={{
                fontSize: t.font.size.sm,
                color: t.color.textMuted,
                marginBottom: t.space(1),
              }}
            >
              Activity log
            </div>
            <div style={logsContainerStyle}>
              {logLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Modal
        isOpen={isNewLeadOpen}
        title="Add New Lead"
        onClose={() => setIsNewLeadOpen(false)}
      >
        <div
          style={{
            fontSize: t.font.size.sm,
            color: t.color.textMuted,
            marginBottom: t.space(2),
          }}
        >
          Provide all required details to register a new lead.
        </div>
        <NewLeadForm
          onSubmit={handleAddLead}
          onCancel={() => setIsNewLeadOpen(false)}
        />
      </Modal>
    </div>
  );
}
