import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { metamaskConnector } from "../web3.helpers";

// hook from documentation
export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    metamaskConnector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(metamaskConnector, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
