import { ShallowWrapper, shallow, mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { _Popover as Popover } from "shared/components/popover/popover";
import Tooltip from "./tooltip";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";

const initialState = {
  ui: { scrollTop: 0 }
};

const mockStore = configureStore();

describe("Tooltip tests", () => {
  let store: MockStoreEnhanced;
  let component: ReactWrapper;
  const Render = () => <div className="render-func">Any</div>;
  const children = <span className="test-children">Any</span>;
  const componentTooltip = <span>Any</span>;
  const title = "title";

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.append(modalRoot);
    store = mockStore(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  describe("passed render Tooltip", () => {
    test("should render Tooltip", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      expect(component.find(Popover)).toHaveLength(1);
      expect(component.find(".test-children")).toHaveLength(1);
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeFalsy();
      expect(component.find(".render-func")).toHaveLength(0);
    });
    test("should render Tooltip using component", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip component={componentTooltip} render={Render}>
            {children}
          </Tooltip>
        </Provider>
      );
      expect(component.find(Popover).prop("children")).toBe(componentTooltip);
    });
    test("should render Tooltip using title", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip title={title} render={Render}>
            {children}
          </Tooltip>
        </Provider>
      );
      expect(component.find(Popover).prop("children")).toBe(title);
    });
  });

  describe("passed props Tooltip", () => {
    test("should one children prop", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      expect(component.childAt(0)).toHaveLength(1);
    });
  });
  describe("passed show/hide Tooltip", () => {
    test("should show Tooltip on mouseEnter", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("mouseEnter");
      expect(component.find(".render-func")).toHaveLength(1);
    });
    test("should show Tooltip on touchStart", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("touchStart");
      expect(component.find(".render-func")).toHaveLength(1);
    });
    test("should hide Tooltip on mouseLeave", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("mouseLeave");
      expect(component.find(".render-func")).toHaveLength(0);
    });
    test("should hide Tooltip on touchEnd", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("touchEnd");
      expect(component.find(".render-func")).toHaveLength(0);
    });
  });
});
