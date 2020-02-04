import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import useAnchor, { anchorNullValue } from "./anchor.hook";

describe("test anchor hook", () => {
  describe("test init anchor", () => {
    it("should be init anchor", () => {
      const { anchor } = renderHook(() => useAnchor()).result.current;
      expect(anchor).toBe(anchorNullValue);
    });
  });
  describe("test set anchor", () => {
    it("should be set anchor from event", () => {
      const { result } = renderHook(() => useAnchor());
      const currentTarget = "test";
      const event = ({ currentTarget } as unknown) as React.MouseEvent<
        Element,
        Event
      >;
      act(() => {
        result.current.setAnchor(event);
      });
      expect(result.current.anchor).toBe(currentTarget);
    });
    it("should be set undefined if event is undefined", () => {
      const { result } = renderHook(() => useAnchor());
      const currentTarget = undefined;
      const event = (currentTarget as unknown) as React.MouseEvent<
        Element,
        Event
      >;
      act(() => {
        result.current.setAnchor(event);
      });
      expect(result.current.anchor).toBe(currentTarget);
    });
  });
  describe("test clean anchor", () => {
    it("should be clean anchor", () => {
      const { result } = renderHook(() => useAnchor());
      const currentTarget = "test";
      const event = ({ currentTarget } as unknown) as React.MouseEvent<
        Element,
        Event
      >;
      act(() => {
        result.current.setAnchor(event);
      });
      expect(result.current.anchor).toBe(currentTarget);
      act(() => {
        result.current.clearAnchor();
      });
      expect(result.current.anchor).toBe(anchorNullValue);
    });
  });
});
