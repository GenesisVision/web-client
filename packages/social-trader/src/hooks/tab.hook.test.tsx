import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import useTab from "./tab.hook";

enum TABS {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD"
}

describe("test tab hook", () => {
  describe("test init tab", () => {
    it("should be init tab", () => {
      const initTab = TABS.FIRST;
      const { tab } = renderHook(() => useTab<TABS>(initTab)).result.current;
      expect(tab).toBe(initTab);
    });
  });
  describe("test set tab", () => {
    it("should be set tab from event", () => {
      const initTab = TABS.FIRST;
      const { result } = renderHook(() => useTab<TABS>(initTab));
      expect(result.current.tab).toBe(initTab);
      const secondTab = TABS.SECOND;
      act(() => {
        result.current.setTab(
          {} as React.SyntheticEvent<EventTarget>,
          secondTab
        );
      });
      expect(result.current.tab).toBe(secondTab);
      const thirdTab = TABS.THIRD;
      act(() => {
        result.current.setTab(
          {} as React.SyntheticEvent<EventTarget>,
          thirdTab
        );
      });
      expect(result.current.tab).toBe(thirdTab);
    });
  });
});
