import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import PrivateRoute from "./private-route";

const PRIVATE_ROUTE = "/private";
const initialEntries = [LOGIN_ROUTE, PRIVATE_ROUTE];

const mockStore = configureStore();
const getInitialState = (isAuthenticated: boolean) => ({
  authData: { isAuthenticated }
});

const privateText = "private route";
const loginText = "public text";

const PrivatePage = () => <h1>{privateText}</h1>;
const LoginPage = () => <h1>{loginText}</h1>;

const App = ({
  store,
  initialIndex
}: {
  store: MockStoreEnhanced;
  initialIndex: number;
}): JSX.Element => (
  <Provider store={store}>
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Switch>
        <PrivateRoute path={PRIVATE_ROUTE} component={() => <PrivatePage />} />
        <Route path={LOGIN_ROUTE} component={() => <LoginPage />} />
      </Switch>
    </MemoryRouter>
  </Provider>
);

describe("Private router tests", () => {
  let component: ReactWrapper;
  afterEach(() => {
    component.unmount();
  });
  test("Should show login page", () => {
    const store: MockStoreEnhanced = mockStore(getInitialState(false));
    component = mount(<App store={store} initialIndex={0} />);
    expect(component.find(LoginPage)).toHaveLength(1);
    expect(component.find(LoginPage).text()).toBe(loginText);
    expect(component.find(PrivatePage)).toHaveLength(0);
  });
  test("Should redirect to login page", () => {
    const store: MockStoreEnhanced = mockStore(getInitialState(false));
    component = mount(<App store={store} initialIndex={1} />);
    expect(component.find(LoginPage)).toHaveLength(1);
    expect(component.find(LoginPage).text()).toBe(loginText);
    expect(component.find(PrivatePage)).toHaveLength(0);
  });
  test("Should show private route", () => {
    const store: MockStoreEnhanced = mockStore(getInitialState(true));
    component = mount(<App store={store} initialIndex={1} />);
    expect(component.find(PrivatePage)).toHaveLength(1);
    expect(component.find(PrivatePage).text()).toBe(privateText);
    expect(component.find(LoginPage)).toHaveLength(0);
  });
});
