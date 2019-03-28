import * as React from "react";
import { _Popover as Popover } from "./popover";
import { shallow } from "enzyme";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Popover tests", () => {
  test("should render popover", () => {
    const popover = shallow(<Popover scrollTop={0} anchorEl={() => {}} />);
    expect(popover.find(".popover")).toHaveLength(1);
  });
  test("should set no-padding class", () => {
    const popover = shallow(
      <Popover noPadding scrollTop={0} anchorEl={() => {}} />
    );
    expect(popover.find(".popover--no-padding")).toHaveLength(1);
  });
  test("should set custom class", () => {
    const anyClass = "any-class";
    const popover = shallow(
      <Popover className={anyClass} scrollTop={0} anchorEl={() => {}} />
    );
    expect(popover.find(`.${anyClass}`)).toHaveLength(1);
  });
});
