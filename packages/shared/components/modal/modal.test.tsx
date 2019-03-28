import * as React from "react";
import { shallow } from "enzyme";
import Modal from "./modal";
import EventListener from "react-event-listener";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Modal tests", () => {
  test("should render modal", () => {
    const modal = shallow(<Modal open />);
    expect(modal.find(".modal")).toHaveLength(1);
  });
  test("should set position-fixed modificator", () => {
    const modal = shallow(<Modal open fixed />);
    expect(modal.find(".modal--position-fixed")).toHaveLength(1);
  });
  test("should set position-absolute modificator", () => {
    const modal = shallow(<Modal open />);
    expect(modal.find(".modal--position-absolute")).toHaveLength(1);
  });
  test("should not set position-absolute modificator", () => {
    const modal = shallow(<Modal open fixed disableBackdropClick />);
    expect(modal.find(".modal--position-absolute")).not.toHaveLength(1);
  });
  test("should not set backdrop--transparent modificator", () => {
    const modal = shallow(<Modal open transparentBackdrop />);
    expect(modal.find(".modal__backdrop--transparent")).toHaveLength(1);
  });
  test("should call click event", () => {
    const handleClick = jest.fn();
    const modal = shallow(<Modal open onClose={handleClick} />);
    modal
      .find(EventListener)
      .dive()
      .simulate("click");
    expect(handleClick).toBeCalled();
  });
  test("should call key press event", () => {
    const handleClick = jest.fn();
    const modal = shallow(<Modal open onClose={handleClick} />);
    modal.find(EventListener).simulate("keyUp", { keyCode: 27 });
    expect(handleClick).toBeCalled();
  });
});
