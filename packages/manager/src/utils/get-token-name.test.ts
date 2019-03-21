import { getTokenName } from "shared/utils/get-token-name";

describe("test get-token", () => {
  it("must be gvManagerToken", () => {
    expect(getTokenName()).toEqual("gvManagerToken");
  });
});
