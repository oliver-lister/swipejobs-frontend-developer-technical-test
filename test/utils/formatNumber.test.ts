import { describe, it, expect } from "vitest";
import { formatNumber } from "../../src/lib/utils/formatNumber";

describe("formatNumber", () => {
  it("formats a 10-digit number correctly", () => {
    const phone = "1234567890";
    const result = formatNumber(phone);
    expect(result).toBe("(123) 456 7890");
  });

  it("returns the input unchanged if it does not match the expected format", () => {
    const phone = "12345";
    const result = formatNumber(phone);
    expect(result).toBe("12345");
  });

  it("handles an empty string gracefully", () => {
    const phone = "";
    const result = formatNumber(phone);
    expect(result).toBe("");
  });

  it("returns the formatted number even with additional characters", () => {
    const phone = "123-456-7890";
    const result = formatNumber(phone);
    expect(result).toBe("(123) 456 7890");
  });

  it("handles numbers with spaces by removing them before formatting", () => {
    const phone = "123 456 7890";
    const result = formatNumber(phone);
    expect(result).toBe("(123) 456 7890");
  });
});
