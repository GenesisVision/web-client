import { ShallowWrapper, shallow } from "enzyme";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";

import { GVTooltipTab } from "./gv-tooltip-tab";

describe("GVTooltipTab tests", () => {
  const tabLabel = "tabLabel";
  const tooltipContent = "tooltipContent";
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(
      <GVTooltipTab tooltipContent={tooltipContent} tabLabel={tabLabel} />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("should render tooltip tab", () => {
    expect(component.find(Tooltip)).toHaveLength(1);
  });
  test("should set tab label", () => {
    expect(component.find(".gv-tab__label")).toHaveLength(1);
    expect(component.find(".gv-tab__label").text()).toBe(`${tabLabel}`);
  });
});
