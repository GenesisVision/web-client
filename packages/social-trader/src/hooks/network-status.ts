import { useEffect, useState } from "react";

const initialEffectiveConnectionType = "4g";

let unsupported: any;

declare const navigator: {
  [key: string]: any;
};

const useNetworkStatus = (initialEffectiveConnectionType?: any) => {
  if (
    typeof navigator !== "undefined" &&
    "connection" in navigator &&
    "effectiveType" in navigator.connection
  ) {
    unsupported = false;
  } else {
    unsupported = true;
  }

  const initialNetworkStatus = {
    unsupported,
    effectiveConnectionType: unsupported
      ? initialEffectiveConnectionType
      : navigator.connection.effectiveType
  };

  const [networkStatus, setNetworkStatus] = useState<{
    unsupported?: any;
    effectiveConnectionType?: any;
  }>(initialNetworkStatus);

  useEffect(() => {
    if (!unsupported) {
      const navigatorConnection =
        "connection" in navigator && navigator.connection;
      const updateECTStatus = () => {
        setNetworkStatus({
          effectiveConnectionType: navigatorConnection.effectiveType
        });
      };
      navigatorConnection.addEventListener("change", updateECTStatus);
      return () => {
        navigatorConnection.removeEventListener("change", updateECTStatus);
      };
    }
  }, []);

  return { ...networkStatus, setNetworkStatus };
};

export { useNetworkStatus, initialEffectiveConnectionType };
