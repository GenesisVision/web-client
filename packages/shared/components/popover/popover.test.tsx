import * as React from "react";
import { _Popover as Popover } from "./popover";
import { shallow } from "enzyme";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Popover tests", () => {
  test("should render popover", () => {
    const component = shallow(<Popover scrollTop={0} anchorEl={() => {}} />);
    expect(component.find(".popover")).toHaveLength(1);
  });
  test("should set no-padding class", () => {
    const component = shallow(
      <Popover noPadding scrollTop={0} anchorEl={() => {}} />
    );
    expect(component.find(".popover--no-padding")).toHaveLength(1);
  });
  test("should set custom class", () => {
    const anyClass = "any-class";
    const component = shallow(
      <Popover className={anyClass} scrollTop={0} anchorEl={() => {}} />
    );
    expect(component.find(`.${anyClass}`)).toHaveLength(1);
  });
});
