import { useEffect } from "react";
import useTab from "shared/hooks/tab.hook";
import { getLocation, setHash } from "shared/utils/location";

const useHashTab = <T>(initValue: T) => {
  const { tab, setTab } = useTab<T>(initValue);
  useEffect(() => {
    setTab(null, getLocation().hash);
  }, []);
  useEffect(
    () => {
      setHash(String(tab));
    },
    [tab]
  );
  return { tab, setTab };
};

export default useHashTab;
