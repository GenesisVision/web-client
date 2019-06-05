import { shallow } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import configureStore from "redux-mock-store";

import { AlertMessagesState } from "../../modules/alert-message/reducers/alert-message-reducers";
import BackButton from "./back-button";

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

const App = ({ store }: { store: MockStoreEnhanced }) => (
  <Provider store={store}>
    <BackButton />
  </Provider>
);

const getInitialStore = (messages: AlertMessagesState = []) => ({
  alertMessages: messages
});

const mockStore = configureStore();

describe("Popover tests", () => {
  test("should render popover", () => {
    // const component = shallow(<BackButton backPath="backPath"/>);
    // expect(component.find(".popover")).toHaveLength(1);
  });
  // test("should set no-padding class", () => {
  //   const component = shallow(
  //     <Popover noPadding scrollTop={0} anchorEl={() => {}} />
  //   );
  //   expect(component.find(".popover--no-padding")).toHaveLength(1);
  // });
  // test("should set custom class", () => {
  //   const anyClass = "any-class";
  //   const component = shallow(
  //     <Popover className={anyClass} scrollTop={0} anchorEl={() => {}} />
  //   );
  //   expect(component.find(`.${anyClass}`)).toHaveLength(1);
  // });
});
