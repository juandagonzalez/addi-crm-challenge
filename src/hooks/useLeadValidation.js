import { useCallback, useMemo, useState } from "react";
import {
  nationalRegistryCheck,
  judicialRecordsCheck,
  internalScoring,
} from "../services/validationService";

export function useLeadValidation(log) {
  const [busyMap, setBusyMap] = useState({});
  const [validationStatus, setValidationStatus] = useState({});

  const anyValidating = useMemo(
    () => Object.values(busyMap).some((v) => v === "validating"),
    [busyMap]
  );

  const validateLead = useCallback(
    async (lead, onSuccess, onFailure) => {
      if (!lead || !lead.id) return;
      const leadId = lead.id;

      setBusyMap((m) => ({ ...m, [leadId]: "validating" }));
      setValidationStatus((prev) => ({
        ...prev,
        [leadId]: {
          nationalOk: false,
          judicialOk: false,
          scoringOk: false,
          running: true,
        },
      }));

      if (log) {
        log(`Validating ${lead.id} - ${lead.firstName} ${lead.lastName}`);
      }

      try {
        const [nationalRes, judicialRes] = await Promise.allSettled([
          nationalRegistryCheck(lead),
          judicialRecordsCheck(lead),
        ]);

        const nationalOk =
          nationalRes.status === "fulfilled" ? !!nationalRes.value.ok : false;
        const judicialOk =
          judicialRes.status === "fulfilled" ? !!judicialRes.value.ok : false;

        const scoringRes = await internalScoring(
          { nationalOk, judicialOk },
          { rng: Math.random }
        );

        const scoringOk = !!scoringRes.ok;
        const allPass = nationalOk && judicialOk && scoringOk;

        setValidationStatus((prev) => ({
          ...prev,
          [leadId]: {
            nationalOk,
            judicialOk,
            scoringOk,
            running: false,
          },
        }));

        if (allPass) {
          if (log) {
            log(`Converted ${lead.id} to Prospect`);
          }
          if (onSuccess) {
            onSuccess(scoringRes.score);
          }
          setValidationStatus((prev) => {
            const copy = { ...prev };
            delete copy[leadId];
            return copy;
          });
        } else {
          if (log) {
            log(`Validation failed for ${lead.id}`);
          }
          if (onFailure) {
            onFailure();
          }
        }
      } catch (err) {
        if (log) {
          log(`Unexpected error: ${(err && err.message) || String(err)}`);
        }
        setValidationStatus((prev) => ({
          ...prev,
          [leadId]: {
            nationalOk: false,
            judicialOk: false,
            scoringOk: false,
            running: false,
          },
        }));
        if (onFailure) {
          onFailure();
        }
      } finally {
        setBusyMap((m) => ({ ...m, [leadId]: "idle" }));
      }
    },
    [log]
  );

  return {
    busyMap,
    validationStatus,
    anyValidating,
    validateLead,
  };
}
