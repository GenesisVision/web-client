import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [isWindow, setIsWindow] = useState<boolean>(false);
  const [request, setRequest] = useState<Function | undefined>(undefined);
  useEffect(() => {
    if (typeof window !== "undefined") setIsWindow(true);
  }, [window]);
  useEffect(() => {
    if (request && isWindow) {
      request();
      setRequest(undefined);
    }
  }, [request, isWindow]);

  const setToStorage = useCallback(
    (key: string, value: string) => {
      setRequest(() => window.localStorage.setItem(key, value));
    },
    [window]
  );
  const getFromStorage = useCallback(
    (key: string) => {
      return isWindow ? window.localStorage.getItem(key) : undefined;
    },
    [isWindow, window]
  );
  return {
    setToStorage,
    getFromStorage
  };
};
