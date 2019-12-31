import useTab from "hooks/tab.hook";
import Router from "next/router";
import { useCallback, useEffect } from "react";
import { getLocation } from "utils/location";

const useHashTab = <T>(initValue: T) => {
  const { tab, setTab } = useTab<T>(initValue);
  const handle = useCallback((tab: string) => {
    const i = tab.indexOf("#");
    if (i > 0) {
      const hash = tab.slice(i, tab.length);
      setTab(null, hash);
    } else {
      setTab(null, "");
    }
  }, []);
  useEffect(() => {
    setTab(null, getLocation().hash);
    Router.events.on("hashChangeComplete", handle);
    return () => Router.events.off("hashChangeComplete", handle);
  }, [handle]);
  return { tab, setTab };
};

export default useHashTab;
