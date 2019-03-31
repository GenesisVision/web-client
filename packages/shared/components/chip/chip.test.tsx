import * as React from "react";
import { shallow } from "enzyme";
import Chip, { CHIP_TYPE } from "./chip";

describe("Chip tests", () => {
  test("should render chip", () => {
    const component = shallow(<Chip>Any</Chip>);
    expect(component.find(".chip")).toHaveLength(1);
  });
  test("should set className", () => {
    const className = "className";
    const component = shallow(<Chip className={className}>Any</Chip>);
    expect(component.find(`.${className}`)).toHaveLength(1);
  });
  test("should set --rounded modificator", () => {
    const popover = shallow(<Chip rounded>Any</Chip>);
    expect(popover.find(".chip--rounded")).toHaveLength(1);
  });
  test("should set --disabled modificator", () => {
    const popover = shallow(<Chip disabled>Any</Chip>);
    expect(popover.find(".chip--disabled")).toHaveLength(1);
  });
  test("should set --disabled modificator", () => {
    const handleClick = jest.fn();
    const popover = shallow(<Chip onClick={handleClick}>Any</Chip>);
    expect(popover.find(".chip--pointer")).toHaveLength(1);
  });
  test("should set type modificator", () => {
    const type = CHIP_TYPE.POSITIVE;
    const popover = shallow(<Chip type={type}>Any</Chip>);
    expect(popover.find(`.chip--${type}`)).toHaveLength(1);
  });
});
