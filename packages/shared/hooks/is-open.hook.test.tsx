import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import useIsOpen from "./is-open.hook";

describe("test isOpen hook", () => {
  describe("test init isOpen", () => {
    it("should be init isOpen", () => {
      const { result } = renderHook(() => useIsOpen());
      expect(result.current[0]).toBe(false);
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
  });
});
