const API_LATENCY_BASE = 2000; // ms
const API_LATENCY_JITTER = 500; // +/- ms

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getConfiguredLatency(baseMultiplier = 1) {
  const base = API_LATENCY_BASE * baseMultiplier;
  const jitter = randRange(-API_LATENCY_JITTER, API_LATENCY_JITTER);
  return Math.max(0, base + jitter);
}

export async function nationalRegistryCheck(lead, opts = {}) {
  const {
    latency = [getConfiguredLatency(1), getConfiguredLatency(1)],
    failureRate = 0.1,
  } = opts;

  const ms = randRange(latency[0], latency[1]);
  await delay(ms);

  const exists = !!(
    lead.nationalId &&
    lead.birthdate &&
    lead.firstName &&
    lead.lastName &&
    lead.email
  );

  if (Math.random() < failureRate) {
    throw new Error("National registry service unavailable");
  }

  const mismatch = Math.random() < 0.05 ? "Random mismatch" : null;

  if (!exists || mismatch) {
    return {
      ok: false,
      reason: mismatch || "Record not found or incomplete",
    };
  }

  return { ok: true };
}

export async function judicialRecordsCheck(lead, opts = {}) {
  const {
    latency = [getConfiguredLatency(1), getConfiguredLatency(1)],
    hitRate = 0.15,
    failureRate = 0.08,
  } = opts;

  const ms = randRange(latency[0], latency[1]);
  await delay(ms);

  if (Math.random() < failureRate) {
    throw new Error("Judicial records service timeout");
  }

  const hasRecords = Math.random() < hitRate;
  return { ok: !hasRecords, hasRecords };
}

export async function internalScoring(prereqResults, opts = {}) {
  const {
    latency = [getConfiguredLatency(1), getConfiguredLatency(1)],
    rng = Math.random,
  } = opts;

  const ms = randRange(latency[0], latency[1]);
  await delay(ms);

  if (!prereqResults?.nationalOk || !prereqResults?.judicialOk) {
    return { ok: false, score: 0, reason: "Prerequisites failed" };
  }

  const score = Math.round(rng() * 100);
  return { ok: score > 60, score };
}
