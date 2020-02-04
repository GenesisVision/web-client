import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import GVButton from "../gv-button";
import BackButton from "./back-button";

jest.mock("react-i18next", () => {
  return {
    withTranslation: () => (Component: any) => {
      Component.defaultProps = {
        ...Component.defaultProps,
        t: (key: string): string => key
      };
      return Component;
    }
  };
});

const App = ({ store }: { store: MockStoreEnhanced }) => (
  <Provider store={store}>
    <BackButton />
  </Provider>
);

const getInitialStore = (router: any = {}) => ({
  router
});

const mockStore = configureStore();

const emptyRouter = { location: {} };
const routerWithState = {
  location: { state: "backPath", prevPath: "/prevPath" }
};

describe("BackButton tests", () => {
  let store: MockStoreEnhanced;
  let component: ReactWrapper;

  afterEach(() => {
    component.unmount();
  });

  test("should not be rendered", () => {
    store = mockStore(getInitialStore(emptyRouter));
    component = mount(<App store={store} />);
    expect(component.find(".back-button")).toHaveLength(0);
    expect(component.find(GVButton)).toHaveLength(0);
  });

  xdescribe("should render", () => {
    beforeEach(() => {
      store = mockStore(getInitialStore(routerWithState));
      component = mount(<App store={store} />);
    });
    test("should render back button", () => {
      expect(component.find(".back-button")).toHaveLength(1);
      expect(component.find(GVButton)).toHaveLength(1);
    });
    test("should set text for back button", () => {
      expect(component.find(".back-button__path").text()).toBe(
        routerWithState.location.state
      );
    });
  });
});
