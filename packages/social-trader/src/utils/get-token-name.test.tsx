import { getTokenName } from "./get-token-name";

describe("test get-token", () => {
  it("must be gvTestToken", () => {
    expect(getTokenName()).toEqual(`gvToken`);
  });
});
