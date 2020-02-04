import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";

import Hint from "./hint";

describe("Hint tests", () => {
  const className = "className";
  const content = <>content</>;
  const tooltipContent = <>tooltipContent</>;
  const vertical = VERTICAL_POPOVER_POS.BOTTOM;
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(
      <Hint
        className={className}
        content={content}
        tooltipContent={tooltipContent}
        vertical={vertical}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("should render Hint", () => {
    expect(component.find(".hint")).toHaveLength(1);
    expect(component.find(Tooltip)).toHaveLength(1);
  });
  test("should set className", () => {
    expect(component.find(`.${className}`)).toHaveLength(1);
  });
  test("should set vertical for Tooltip", () => {
    expect(component.find(Tooltip).prop("vertical")).toBe(vertical);
  });
});
