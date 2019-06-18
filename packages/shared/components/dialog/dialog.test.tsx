import { shallow } from "enzyme";
import * as React from "react";
import EventListener from "react-event-listener";

import _Dialog from "./dialog";

jest.mock("react-i18next", () => {
  return {
    translate: () => (Component: any) => {
      Component.defaultProps = {
        ...Component.defaultProps,
        t: (key: string): string => key
      };
      return Component;
    }
  };
});

const handleClick = jest.fn();
const children = <span className="test-children">Any</span>;

describe("Dialog tests", () => {
  test("should render dialog", () => {
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    expect(component.find(".dialog")).toHaveLength(1);
    expect(component.find(".test-children")).toHaveLength(1);
  });
  test("should set custom class", () => {
    const anyClass = "any-class";
    const component = shallow(
      <_Dialog className={anyClass} open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    expect(component.find(`.${anyClass}`)).toHaveLength(1);
  });
  test("should set wider modifier for close outside button", () => {
    const component = shallow(
      <_Dialog open onClose={handleClick} wider>
        {children}
      </_Dialog>
    );
    expect(component.find(".dialog__close--wider")).toHaveLength(1);
  });
  test("should call click backdrop", () => {
    const handleClick = jest.fn();
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(".dialog__backdrop").simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call click close outside button", () => {
    const handleClick = jest.fn();
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(".dialog__close--outside").simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call click close inside button", () => {
    const handleClick = jest.fn();
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(".dialog__close--inside").simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call key press esc", () => {
    const component = shallow(
      <_Dialog open onClose={handleClick}>
        {children}
      </_Dialog>
    );
    component.find(EventListener).simulate("keyUp", { keyCode: 27 });
    expect(handleClick).toBeCalled();
  });
});
