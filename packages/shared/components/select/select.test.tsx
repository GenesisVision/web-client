import { ReactWrapper, mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import Select, { SelectChangeEvent } from "./select";
import SelectItem from "./select-item";

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
  it("should render select", () => {
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

  it("should open popover", () => {
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

  it("should select new value", () => {
    component = mount(
      <Provider store={store}>
        <Parent value={children[1]}>
          {({ test, handleChange }) => (
            <Select value={test} name="test" onChange={handleChange}>
              {children.map(child => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </Select>
          )}
        </Parent>
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

  it("should be disabled", () => {
    component = mount(
      <Provider store={store}>
        <Parent value={children[1]}>
          {({ test, handleChange }) => (
            <Select value={test} name="test" onChange={handleChange} disabled>
              {children.map(child => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </Select>
          )}
        </Parent>
      </Provider>
    );
    expect(component.find(".select__text").text()).toBe(children[1]);
    expect(component.find(".select--disabled")).toHaveLength(1);
    component.find("button").simulate("click");
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeFalsy();
  });
});

interface InjectedProps {
  test: string;
  handleChange(props: SelectChangeEvent): void;
}

interface Props {
  value: string;
  children(props: InjectedProps): JSX.Element;
}

class Parent extends React.Component<Props, any> {
  state = {
    test: this.props.value
  };
  handleChange = (event: SelectChangeEvent) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return this.props!.children({
      test: this.state.test,
      handleChange: this.handleChange
    });
  }
}
