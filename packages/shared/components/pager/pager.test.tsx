import * as React from "react";
import { shallow, mount } from "enzyme";
import { _Pager as Pager } from "./pager";

describe("Pager tests", () => {
  test("should render pager", () => {
    const handleClick = jest.fn();
    const pager = shallow(
      <Pager total={6} current={1} onPageChanged={handleClick} />
    );
    expect(pager.find(".pager")).toHaveLength(1);
  });
});
