import { mount } from "enzyme";
import React from "react";

import GVTab from "./gv-tab";
import GVTabs from "./index";

describe("GVTabs tests", () => {
  test("should render tabs", () => {
    const tabsClass = "gv-tabs";
    const gvTabs = mount(
      <GVTabs value="tab">
        <GVTab label="1" value="1" />
        <GVTab label="1" value="2" />
      </GVTabs>
    );
    expect(gvTabs.find(`.${tabsClass}`)).toHaveLength(1);
    gvTabs.unmount();
  });

  test("should call onChange when clicking", () => {
    const handleChange = jest.fn();
    const gvTabs = mount(
      <GVTabs value="tab" onChange={handleChange}>
        <GVTab label="1" value="1" />
        <GVTab label="1" value="2" />
      </GVTabs>
    );
    gvTabs
      .find(GVTab)
      .at(1)
      .simulate("click");
    expect(handleChange).toBeCalled();
    expect(handleChange.mock.calls[0][1]).toBe("2");
    gvTabs.unmount();
  });
});
