import { shallow } from "enzyme";
import * as React from "react";
import EventListener from "react-event-listener";

import Modal from "./modal";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Modal tests", () => {
  test("should render modal", () => {
    const component = shallow(<Modal open />);
    expect(component.find(".modal")).toHaveLength(1);
  });
  test("should set position-fixed modificator", () => {
    const modal = shallow(<Modal open fixed />);
    expect(modal.find(".modal--position-fixed")).toHaveLength(1);
  });
  test("should set position-absolute modificator", () => {
    const component = shallow(<Modal open />);
    expect(component.find(".modal--position-absolute")).toHaveLength(1);
  });
  test("should not set position-absolute modificator", () => {
    const component = shallow(<Modal open fixed absolute={false} />);
    expect(component.find(".modal--position-absolute")).not.toHaveLength(1);
  });
  test("should not set backdrop--transparent modificator", () => {
    const component = shallow(<Modal open transparentBackdrop />);
    expect(component.find(".modal__backdrop--transparent")).toHaveLength(1);
  });
  test("should call click event", () => {
    const handleClick = jest.fn();
    const component = shallow(<Modal open onClose={handleClick} />);
    component
      .find(EventListener)
      .dive()
      .simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call key press event", () => {
    const handleClick = jest.fn();
    const component = shallow(<Modal open onClose={handleClick} />);
    component.find(EventListener).simulate("keyUp", { keyCode: 27 });
    expect(handleClick).toBeCalled();
  });
});
