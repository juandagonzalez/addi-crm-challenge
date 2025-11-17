import { renderHook, act } from "@testing-library/react";
import * as service from "../services/validationService";
import { useLeadValidation } from "./useLeadValidation";

describe("useLeadValidation", () => {
  const lead = {
    id: "L-1",
    nationalId: "N-123",
    birthdate: "1990-01-01",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  beforeEach(() => {
    jest
      .spyOn(service, "nationalRegistryCheck")
      .mockResolvedValue({ ok: true });
    jest.spyOn(service, "judicialRecordsCheck").mockResolvedValue({ ok: true });
    jest
      .spyOn(service, "internalScoring")
      .mockResolvedValue({ ok: true, score: 80 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("sets busy and validation status and calls onSuccess when all pass", async () => {
    const log = jest.fn();
    const { result } = renderHook(() => useLeadValidation(log));

    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    await act(async () => {
      await result.current.validateLead(lead, onSuccess, onFailure);
    });

    expect(result.current.busyMap[lead.id]).toBe("idle");
    expect(onSuccess).toHaveBeenCalledWith(80);
    expect(onFailure).not.toHaveBeenCalled();

    const status = result.current.validationStatus[lead.id];
    // status is removed after success; check it's undefined
    expect(status).toBeUndefined();
  });

  test("calls onFailure when scoring fails", async () => {
    jest
      .spyOn(service, "internalScoring")
      .mockResolvedValueOnce({ ok: false, score: 20 });

    const { result } = renderHook(() => useLeadValidation());

    const onSuccess = jest.fn();
    const onFailure = jest.fn();

    await act(async () => {
      await result.current.validateLead(lead, onSuccess, onFailure);
    });

    expect(onFailure).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();

    const status = result.current.validationStatus[lead.id];
    expect(status).toEqual({
      nationalOk: true,
      judicialOk: true,
      scoringOk: false,
      running: false,
    });
  });

  test("anyValidating is true while validation is in progress", async () => {
    // make it hang until we resolve
    let resolveNational;
    const nationalPromise = new Promise((res) => {
      resolveNational = res;
    });

    jest
      .spyOn(service, "nationalRegistryCheck")
      .mockReturnValueOnce(nationalPromise);
    jest
      .spyOn(service, "judicialRecordsCheck")
      .mockResolvedValueOnce({ ok: true });
    jest
      .spyOn(service, "internalScoring")
      .mockResolvedValueOnce({ ok: true, score: 90 });

    const { result } = renderHook(() => useLeadValidation());

    act(() => {
      // don't await here to check intermediate state
      result.current.validateLead(
        lead,
        () => {},
        () => {}
      );
    });

    expect(result.current.anyValidating).toBe(true);

    await act(async () => {
      resolveNational({ ok: true });
    });

    expect(result.current.anyValidating).toBe(false);
  });
});
