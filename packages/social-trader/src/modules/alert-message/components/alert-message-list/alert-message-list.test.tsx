import GVButton from "components/gv-button";
import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { AlertMessagesState } from "../../reducers/alert-message-reducers";
import AlertMessage from "./alert-message";
import AlertMessageList from "./alert-message-list";

jest.mock("react-i18next", () => {
  return {
    useTranslation: () => ({
      t: (string: string) => string
    })
  };
});

const App = ({ store }: { store: MockStoreEnhanced }) => (
  <Provider store={store}>
    <AlertMessageList />
  </Provider>
);

const getInitialStore = (messages: AlertMessagesState = []) => ({
  alertMessages: messages
});

const mockStore = configureStore();

const messages = [
  {
    id: "1",
    text: "message",
    isUseLocalization: false
  },
  {
    id: "2",
    text: "message 2",
    isUseLocalization: false
  }
];

describe("AlertMessageList", () => {
  let store: MockStoreEnhanced;
  let component: ReactWrapper;

  afterEach(() => {
    component.unmount();
  });

  it("should not be rendered", () => {
    store = mockStore(getInitialStore());
    component = mount(<App store={store} />);
    expect(component.find(AlertMessage)).toHaveLength(0);
    expect(component.find(GVButton)).toHaveLength(0);
  });

  describe("passed single message", () => {
    beforeEach(() => {
      store = mockStore(getInitialStore([messages[0]]));
      component = mount(<App store={store} />);
    });
    it("should show single message", () => {
      expect(component.find(AlertMessage)).toHaveLength(1);
    });
    it("should not show button Clear All", () => {
      expect(component.find(GVButton)).toHaveLength(0);
    });
  });

  describe("passed several messages", () => {
    beforeEach(() => {
      store = mockStore(getInitialStore(messages));
      component = mount(<App store={store} />);
    });
    it("should show two messages", () => {
      expect(component.find(AlertMessage)).toHaveLength(2);
    });
    it("should show button Clear All", () => {
      expect(component.find(GVButton)).toHaveLength(1);
    });
  });
});
