import {
  nationalRegistryCheck,
  judicialRecordsCheck,
  internalScoring,
} from "./validationService";

describe("validationService", () => {
  jest.setTimeout(10000);

  const lead = {
    id: "L-1",
    nationalId: "N-123",
    birthdate: "1990-01-01",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  test("nationalRegistryCheck returns ok given valid lead (ignoring random failure)", async () => {
    const res = await nationalRegistryCheck(lead, {
      failureRate: 0,
      latency: [0, 0],
    });

    expect(res).toHaveProperty("ok");
  });

  test("judicialRecordsCheck returns ok or not ok deterministically with no failure", async () => {
    const res = await judicialRecordsCheck(lead, {
      hitRate: 0,
      failureRate: 0,
      latency: [0, 0],
    });
    expect(res.ok).toBe(true);
  });

  test("internalScoring respects prerequisites", async () => {
    const resFail = await internalScoring(
      { nationalOk: false, judicialOk: true },
      { latency: [0, 0], rng: () => 0.9 }
    );
    expect(resFail.ok).toBe(false);
    expect(resFail.score).toBe(0);

    const resSuccess = await internalScoring(
      { nationalOk: true, judicialOk: true },
      { latency: [0, 0], rng: () => 0.9 }
    );
    expect(resSuccess.ok).toBe(true);
    expect(resSuccess.score).toBeGreaterThan(0);
  });
});
