import { renderHook } from "@testing-library/react-hooks";
import { ROLE_ENV } from "constants/constants";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import useRole from "./use-role.hook";

const mockStore = configureStore();

describe("test use-role hook", () => {
  it("should return value from store", () => {
    const roleValue = "Store Role";
    const initialState = {
      profileHeader: { data: { userType: roleValue } }
    };
    const store = mockStore(initialState);
    const wrapper = ({ children }: any) => (
      <Provider store={store}>{children}</Provider>
    );
    const role = renderHook(() => useRole(), { wrapper }).result.current;
    expect(role).toBe(roleValue.toLowerCase());
  });

  it("should return value from ENV if did not find value in the store", () => {
    const initialState = {
      profileHeader: { userType: undefined }
    };
    const store = mockStore(initialState);
    const wrapper = ({ children }: any) => (
      <Provider store={store}>{children}</Provider>
    );
    const role = renderHook(() => useRole(), { wrapper }).result.current;
    expect(role).toBe(ROLE_ENV.toLowerCase());
  });
});
