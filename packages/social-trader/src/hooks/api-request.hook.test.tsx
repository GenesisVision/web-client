import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import useApiRequest, { nullValue } from "./api-request.hook";

const mockStore = configureStore();

describe("test useRequest hook", () => {
  const initialState = {};
  const store = mockStore(initialState);
  const wrapper = ({ children }: any) => (
    <Provider store={store}>{children}</Provider>
  );
  describe("test init useRequest", () => {
    it("should be init useRequest", () => {
      const testValue = "testValue";
      const request = () => Promise.resolve(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      expect(result.current.errorMessage).toBe("");
      expect(result.current.data).toBe(nullValue);
      expect(result.current.isPending).toBe(false);
    });
  });
  describe("test send request", () => {
    it("should be run request", async () => {
      let testValue = "testValue";
      const newTestValue = "newTestValue";
      const request = () => {
        testValue = newTestValue;
        return Promise.resolve("") as Promise<string>;
      };
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      await act(() => {
        result.current.sendRequest();
      });
      expect(testValue).toBe(newTestValue);
    });
    it("should be send data request", async () => {
      const testValue = "testValue";
      const request = () => Promise.resolve(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      await act(() => {
        result.current.sendRequest().then(() => {
          expect(result.current.data).toBe(testValue);
        });
      });
    });
    it("should be send isPending === false after send request", async () => {
      const testValue = "testValue";
      const request = () => Promise.resolve(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      act(() => {
        result.current.sendRequest().then(() => {
          expect(result.current.isPending).toBe(false);
        });
      });
    });
    xit("should send error", async () => {
      const testValue = "testValue";
      const request = () => Promise.reject(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      await act(async () => {
        await result.current.sendRequest();
        expect(result.current.errorMessage).toBe(testValue);
      });
    });
    it("should be set args to request", async () => {
      const testArg1 = "testArg1";
      const testArg2 = "testArg2";
      const request = ({ arg1, arg2 }: { arg1: any; arg2: any }) =>
        Promise.resolve(arg1 + arg2) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      await act(() => {
        result.current
          .sendRequest({ arg1: testArg1, arg2: testArg2 })
          .then(() => {
            expect(result.current.data).toBe(testArg1 + testArg2);
          });
      });
    });
  });
});
