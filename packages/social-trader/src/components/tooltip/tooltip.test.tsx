import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import Tooltip from "./tooltip";

const initialState = {
  ui: { scrollTop: 0 }
};

const mockStore = configureStore();

describe("Tooltip tests", () => {
  let store: MockStoreEnhanced;
  let component: ReactWrapper;
  const Render = () => <div className="render-func">Any</div>;
  const children = <span className="test-children">Any</span>;

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.append(modalRoot);
    store = mockStore(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  test("should render Tooltip", () => {
    component = mount(
      <Provider store={store}>
        <Tooltip render={Render}>{children}</Tooltip>
      </Provider>
    );
    expect(document.querySelector("#modal-root")!.hasChildNodes()).toBeFalsy();
    expect(component.find(Popover)).toHaveLength(1);
    expect(component.find(".test-children")).toHaveLength(1);
  });

  describe("passed props Tooltip", () => {
    test("should one children prop", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      expect(component.first()).toHaveLength(1);
    });
    test("should set disable", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render} disable>
            {children}
          </Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("mouseEnter");
      expect(component.find(".render-func")).toHaveLength(0);
    });
    test("should set horizontal", () => {
      const horizontal = HORIZONTAL_POPOVER_POS.RIGHT;
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render} horizontal={horizontal}>
            {children}
          </Tooltip>
        </Provider>
      );
      expect(component.find(Tooltip).prop("horizontal")).toBe(horizontal);
    });
    test("should set vertical", () => {
      const vertical = VERTICAL_POPOVER_POS.TOP;
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render} vertical={vertical}>
            {children}
          </Tooltip>
        </Provider>
      );
      expect(component.find(Tooltip).prop("vertical")).toBe(vertical);
    });
  });
  describe("passed toggle visibility Tooltip", () => {
    test("should show Tooltip on mouseEnter", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeFalsy();
      component.find(".test-children").simulate("mouseEnter");
      expect(component.find(".render-func")).toHaveLength(1);
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeTruthy();
    });
    test("should show Tooltip on touchStart", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeFalsy();
      component.find(".test-children").simulate("touchStart");
      expect(component.find(".render-func")).toHaveLength(1);
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeTruthy();
    });
    test("should hide Tooltip on mouseLeave", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("mouseEnter");
      component.find(".test-children").simulate("mouseLeave");
      expect(component.find(".render-func")).toHaveLength(0);
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeFalsy();
    });
    test("should hide Tooltip on touchEnd", () => {
      component = mount(
        <Provider store={store}>
          <Tooltip render={Render}>{children}</Tooltip>
        </Provider>
      );
      component.find(".test-children").simulate("touchStart");
      component.find(".test-children").simulate("touchEnd");
      expect(component.find(".render-func")).toHaveLength(0);
      expect(
        document.querySelector("#modal-root")!.hasChildNodes()
      ).toBeFalsy();
    });
  });
});
