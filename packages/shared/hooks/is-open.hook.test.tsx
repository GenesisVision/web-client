import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import useIsOpen, { nullValue } from "./is-open.hook";

describe("test isOpen hook", () => {
  describe("test init isOpen", () => {
    it("should be init isOpen", () => {
      const { result } = renderHook(() => useIsOpen());
      expect(result.current[0]).toBe(nullValue);
    });
  });
  describe("test set isOpen", () => {
    it("should be set isOpen to true", () => {
      const { result } = renderHook(() => useIsOpen());
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);
    });
    it("should be set isOpen to false", () => {
      const { result } = renderHook(() => useIsOpen());
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);
      act(() => {
        result.current[2]();
      });
      expect(result.current[0]).toBe(false);
    });
    it("should be set isOpen to value", () => {
      const { result } = renderHook(() => useIsOpen());
      const value = true;
      act(() => {
        result.current[3](value);
      });
      expect(result.current[0]).toBe(value);
      const value2 = false;
      act(() => {
        result.current[3](value2);
      });
      expect(result.current[0]).toBe(value2);
    });
  });
});
