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
    it("should be run request", () => {
      let testValue = "testValue";
      const newTestValue = "newTestValue";
      const request = () => {
        testValue = newTestValue;
        return Promise.resolve("") as Promise<string>;
      };
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      act(() => {
        result.current.sendRequest();
      });
      expect(testValue).toBe(newTestValue);
    });
    it("should be send data request", () => {
      const testValue = "testValue";
      const request = () => Promise.resolve(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      act(() => {
        result.current.sendRequest().then(() => {
          expect(result.current.data).toBe(123);
        });
      });
    });
    it("should be send isPending === false after send request", () => {
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
    it("should be send error", () => {
      const testValue = "testValue";
      const request = () => Promise.reject(testValue) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      act(() => {
        result.current.sendRequest().then(() => {
          expect(result.current.errorMessage).toBe(testValue);
        });
      });
    });
    it("should be set submitting is false", () => {
      const isSubmitting = { value: true };
      const request = () => Promise.reject("") as Promise<string>;
      const setSubmitting = (value: boolean) => {
        isSubmitting.value = value;
      };
      const { result } = renderHook(
        () => useApiRequest({ request, setSubmitting }),
        {
          wrapper
        }
      );
      act(() => {
        result.current.sendRequest().then(() => {
          expect(isSubmitting.value).toBe(false);
        });
      });
    });
    it("should be set args to request", () => {
      const testArg1 = "testArg1";
      const testArg2 = "testArg2";
      const request = (arg1: any, arg2: any) =>
        Promise.reject(arg1 + arg2) as Promise<string>;
      const { result } = renderHook(() => useApiRequest({ request }), {
        wrapper
      });
      result.current.sendRequest(testArg1, testArg2).then(() => {
        expect(result.current.data).toBe(" ");
      });
    });
  });
});
