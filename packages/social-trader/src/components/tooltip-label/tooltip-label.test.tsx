import Tooltip from "components/tooltip/tooltip";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import { TooltipLabel } from "./tooltip-label";

describe("TooltipLabel tests", () => {
  const labelText = "labelText";
  const tooltipContent = "tooltipContent";
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(
      <TooltipLabel tooltipContent={tooltipContent} labelText={labelText} />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("should render tooltip tab", () => {
    expect(component.find(Tooltip)).toHaveLength(1);
  });
  test("should set tab label", () => {
    expect(component.find(".tooltip__label")).toHaveLength(1);
    expect(component.find(".tooltip__label").text()).toBe(`${labelText}`);
  });
});
