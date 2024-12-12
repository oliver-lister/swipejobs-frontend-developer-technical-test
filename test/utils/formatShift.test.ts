import { describe, it, expect } from "vitest";
import { formatShift } from "../../src/lib/utils/formatShift";

describe("formatShift", () => {
  it("should format the shift with correct date, time, and timezone abbreviation for America/New_York", () => {
    const startDate = "2024-12-12T15:00:00Z";
    const endDate = "2024-12-12T18:00:00Z";
    const timeZone = "America/New_York";

    const result = formatShift(startDate, endDate, timeZone);
    expect(result).toBe("DEC 12, THU 10:00 AM - 1:00 PM EST");
  });

  it("should format the shift with correct date, time, and timezone abbreviation for default timezone (America/Chicago)", () => {
    const startDate = "2024-12-12T15:00:00Z";
    const endDate = "2024-12-12T18:00:00Z";

    const result = formatShift(startDate, endDate);
    expect(result).toBe("DEC 12, THU 9:00 AM - 12:00 PM CST");
  });

  it("should throw an error for invalid date inputs", () => {
    const startDate = "invalid-date";
    const endDate = "2024-12-12T18:00:00Z";
    const timeZone = "America/New_York";

    expect(() => formatShift(startDate, endDate, timeZone)).toThrow();
  });

  it("should throw an error for invalid timezone inputs", () => {
    const startDate = "2024-12-12T15:00:00Z";
    const endDate = "2024-12-12T18:00:00Z";
    const timeZone = "Invalid/Timezone";

    expect(() => formatShift(startDate, endDate, timeZone)).toThrow();
  });

  it("should handle shifts spanning multiple days", () => {
    const startDate = "2024-12-31T23:00:00Z";
    const endDate = "2025-01-01T02:00:00Z";
    const timeZone = "America/New_York";

    const result = formatShift(startDate, endDate, timeZone);
    expect(result).toBe("DEC 31, TUE 6:00 PM - 9:00 PM EST");
  });
});
