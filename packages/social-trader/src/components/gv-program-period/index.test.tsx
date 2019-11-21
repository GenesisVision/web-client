import { shallow } from "enzyme";
import React from "react";

import GVProgramPeriod from "./index";

describe("Period render tests", () => {
  test("should render pie period", () => {
    const start = 0,
      end = 100,
      value = 42;
    const periodComponent = shallow(
      <GVProgramPeriod start={start} end={end} value={value} />
    );
    const periodPieClass = "gv-program-period--pie";
    expect(periodComponent.find(`.${periodPieClass}`)).toHaveLength(1);
  });

  test("should render line period", () => {
    const start = 0,
      end = 100,
      value = 42;
    const periodComponent = shallow(
      <GVProgramPeriod start={start} end={end} value={value} variant="line" />
    );
    const periodLineClass = "gv-program-period--line";
    expect(periodComponent.find(`.${periodLineClass}`)).toHaveLength(1);
  });
});
