import { createFullName } from "../../src/lib/utils/createFullName";

describe("createFullName", () => {
  it("correctly returns a fullName from a firstName and a lastName", () => {
    expect(createFullName("Bob", "Ross")).toEqual("Bob Ross");
  });
  it("Returns an empty string for an empty firstName and lastName", () => {
    expect(createFullName("", "")).toEqual(" ");
  });
});
