import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import useErrorMessage, { nullValue } from "./error-message.hook";

describe("test errorMessage hook", () => {
  describe("test init errorMessage", () => {
    it("should be init errorMessage", () => {
      const { result } = renderHook(() => useErrorMessage());
      expect(result.current.errorMessage).toBe(nullValue);
    });
  });
  describe("test set errorMessage", () => {
    it("should be set errorMessage to test value", () => {
      const { result } = renderHook(() => useErrorMessage());
      const testValue = { errorMessage: "testValue", code: "" };
      act(() => {
        result.current.setErrorMessage(testValue);
      });
      expect(result.current.errorMessage).toBe(testValue.errorMessage);
      const testValue2 = { errorMessage: "testValue2", code: "" };
      act(() => {
        result.current.setErrorMessage(testValue2);
      });
      expect(result.current.errorMessage).toBe(testValue2.errorMessage);
    });
    it("should be clean errorMessage", () => {
      const { result } = renderHook(() => useErrorMessage());
      const testValue = { errorMessage: "testValue", code: "" };
      act(() => {
        result.current.setErrorMessage(testValue);
      });
      expect(result.current.errorMessage).toBe(testValue.errorMessage);
      act(() => {
        result.current.cleanErrorMessage();
      });
      expect(result.current.errorMessage).toBe(nullValue);
    });
  });
});
