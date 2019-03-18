import { getTokenName } from "shared/utils/get-token-name";

describe("test get-token", () => {
  it("must be gvInvestorToken", () => {
    expect(getTokenName()).toEqual("gvInvestorToken");
  });
});
