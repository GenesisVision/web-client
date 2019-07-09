import * as React from "react";
import { useState } from "react";

type TEvent = React.SyntheticEvent<EventTarget> | null;

const useTab = <T>(
  initValue: T
): {
  tab: T;
  setTab: (event: TEvent, tab: string) => void;
} => {
  const [tab, setTabInner] = useState<T>(initValue);
  const setTab = (event: TEvent, tab: string) =>
    setTabInner((tab as unknown) as T);
  return { tab, setTab };
};

export default useTab;
