import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useAlerts } from "hooks/alert.hook";
import { useCallback, useState } from "react";

import { metamaskConnector } from "../web3.helpers";

export const useMetamaskConnect = (): {
  connectMetamask: () => void;
  isPending: boolean;
} => {
  const [isPending, setIsPending] = useState(false);
  const { activate } = useWeb3React();
  const { errorAlert } = useAlerts();

  const connectMetamask = useCallback(() => {
    setIsPending(true);
    activate(metamaskConnector, error => {
      // error instanceof UnsupportedChainIdError. maybe should add it
      if (error instanceof NoEthereumProviderError) {
        errorAlert(
          "Please install metamask extension to start using this feature"
        );
      }
    }).finally(() => {
      setIsPending(false);
    });
  }, [activate]);

  return { isPending, connectMetamask };
};
