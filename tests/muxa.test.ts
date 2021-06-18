import { add } from "../src/index";
import { expect } from "chai";

describe("testing if it works", () => {
  it("test adding", () => {
    let value = add(10, 15);
    expect(value).equals(25);
  });
});
