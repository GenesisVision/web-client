import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import Select from "./select";
import SelectItem from "./select-item";
import SelectTestParent from "./select.test-helpers";

const initialState = {
  ui: { scrollTop: 0 }
};

const mockStore = configureStore();

describe("Select tests", () => {
  let store: MockStoreEnhanced;
  let component: ReactWrapper;
  const children = ["hello", "world"];
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.append(modalRoot);
    store = mockStore(initialState);
  });
  afterEach(() => {
    component.unmount();
  });
  test("should render select", () => {
    component = mount(
      <Provider store={store}>
        <Select value={children[1]} name="test" onChange={jest.fn()}>
          {children.map(child => (
            <option key={child} value={child}>
              {child}
            </option>
          ))}
        </Select>
      </Provider>
    );
    expect(component.find(".select")).toHaveLength(1);
    expect(component.find(".select__text").text()).toBe(children[1]);
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeFalsy();
  });

  test("should open popover", () => {
    component = mount(
      <Provider store={store}>
        <Select value={children[1]} name="test" onChange={jest.fn()}>
          {children.map(child => (
            <option key={child} value={child}>
              {child}
            </option>
          ))}
        </Select>
      </Provider>
    );
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeFalsy();
    component.find("button").simulate("click");
    expect(component.find(SelectItem)).toHaveLength(children.length);
    expect(component.find({ isSelected: true })).toHaveLength(1);
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeTruthy();
  });

  test("should select new value", () => {
    component = mount(
      <Provider store={store}>
        <SelectTestParent value={children[1]}>
          {({ test, handleChange }) => (
            <Select value={test} name="test" onChange={handleChange}>
              {children.map(child => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </Select>
          )}
        </SelectTestParent>
      </Provider>
    );
    expect(component.find(".select__text").text()).toBe(children[1]);
    component.find("button").simulate("click");
    component
      .find(".select__option")
      .at(0)
      .simulate("click");
    expect(component.find(".select__text").text()).toBe(children[0]);
  });

  test("should be disabled", () => {
    component = mount(
      <Provider store={store}>
        <SelectTestParent value={children[1]}>
          {({ test, handleChange }) => (
            <Select value={test} name="test" onChange={handleChange} disabled>
              {children.map(child => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </Select>
          )}
        </SelectTestParent>
      </Provider>
    );
    expect(component.find(".select__text").text()).toBe(children[1]);
    expect(component.find(".select--disabled")).toHaveLength(1);
    component.find("button").simulate("click");
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeFalsy();
  });
});
