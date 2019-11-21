import { mount, shallow } from "enzyme";
import React from "react";

import GVTab from "./index";

describe("GVTab tests", () => {
  test("should render tab", () => {
    const tabClass = "gv-tab";
    const gvTab = mount(<GVTab label="tab" value="tab" />);
    expect(gvTab.find(`.${tabClass}`)).toHaveLength(1);
  });

  test("should have label", () => {
    const label = "tab";
    const tabClass = "gv-tab";
    const gvTab = shallow(<GVTab label={label} value="tab" />);
    expect(gvTab.find(`.${tabClass}`).text()).toBe(label);
  });

  test("should have active class", () => {
    const tabActiveClass = "gv-tab--active";
    const gvTab = shallow(<GVTab label="tab" value="tab" selected />);
    expect(gvTab.find(`.${tabActiveClass}`)).toHaveLength(1);
  });

  test("should not be rendered", () => {
    const tabClass = "gv-tab";
    const gvTab = shallow(<GVTab label="tab" value="tab" visible={false} />);
    expect(gvTab.find(`.${tabClass}`)).toHaveLength(0);
  });

  test("should have count", () => {
    const count = 1;
    const countClass = "gv-tab__count";
    const gvTab = shallow(<GVTab count={count} value="tab" label="tab" />);
    expect(gvTab.find(`.${countClass}`).text()).toBe(`${count}`);
  });

  test("should have zero count", () => {
    const count = 0;
    const countClass = "gv-tab__count";
    const gvTab = shallow(<GVTab count={count} value="tab" label="tab" />);
    expect(gvTab.find(`.${countClass}`).text()).toBe(`${count}`);
  });

  test("should have count Class", () => {
    const count = 1;
    const countClass = "count-class-name";
    const gvTab = shallow(
      <GVTab
        count={count}
        value="tab"
        label="tab"
        countClassName={countClass}
      />
    );
    expect(gvTab.find(`.${countClass}`)).toHaveLength(1);
  });

  test("should call click event", () => {
    const handleClick = jest.fn();
    const gvTab = shallow(
      <GVTab label="tab" value="tab" onClick={handleClick} />
    );
    gvTab.simulate("click");
    expect(handleClick).toBeCalled();
  });

  test("should call change event", () => {
    const handleChange = jest.fn();
    const gvTab = shallow(
      <GVTab label="tab" value="tab" onChange={handleChange} />
    );
    gvTab.simulate("click");
    expect(handleChange).toBeCalled();
  });
});
