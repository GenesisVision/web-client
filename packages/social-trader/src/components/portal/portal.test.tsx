import { mount } from "enzyme";
import * as React from "react";

import Portal from "./portal";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

describe("Portal tests", () => {
  const text = "hello world";
  const Text = () => <span>{text}</span>;

  test("shouldn't render portal", () => {
    const component = mount(
      <Portal>
        <Text />
      </Portal>
    );
    expect(component.find(Text)).toHaveLength(0);
    expect(document.getElementById("modal-root")!.hasChildNodes()).toBeFalsy();
  });

  test("should render portal", () => {
    const component = mount(
      <Portal open>
        <Text />
      </Portal>
    );
    expect(component.find(Text)).toHaveLength(1);
    expect(document.getElementById("modal-root")!.hasChildNodes()).toBeTruthy();
    expect(document.querySelectorAll("span")).toHaveLength(1);
    expect(document.querySelector("span")!.innerHTML).toBe(text);
  });
});
