import { shallow } from "enzyme";
import * as React from "react";

import { _Surface as Surface } from "./surface";

describe("Surface tests", () => {
  test("should render surface", () => {
    const component = shallow(<Surface />);
    expect(component.find(".surface")).toHaveLength(1);
  });
  test("should set className", () => {
    const className = "className";
    const component = shallow(<Surface className={className} />);
    expect(component.find(`.${className}`)).toHaveLength(1);
  });
  test("should set any prop to inner div", () => {
    const anyProp = "anyProp";
    const component = shallow(<Surface title={anyProp} />);
    expect(component.find(`.surface`).prop("title")).toBe(anyProp);
  });
});
