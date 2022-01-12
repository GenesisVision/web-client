import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Button } from "components/button/button";
import { SignMessage } from "gv-api-web";
import { useAlerts } from "hooks/alert.hook";
import useApiRequest from "hooks/api-request.hook";
import { useTranslation } from "i18n";
import { useMetamaskConnect } from "modules/web3/hooks/metamask-connect";
import { withWeb3 } from "modules/web3/with-web3";
import React from "react";

import { useAuthMiddleware } from "../hooks/auth-middleware.hook";
import {
  getMetamaskMessageForLogin,
  loginWithMetamask as loginWithMetamaskRequest
} from "../signin.service";

const _MetamaskLoginButton: React.FC = () => {
  const [t] = useTranslation();
  const { active, library, account } = useWeb3React<Web3Provider>();
  const { isPending, connectMetamask } = useMetamaskConnect();
  const { errorAlert } = useAlerts();

  const metamaskSign = ({ message, id }: SignMessage) => {
    library!
      .getSigner(account!)
      .signMessage(message)
      .then(signature => {
        loginWithMetamask({
          signature,
          messageId: id,
          address: account
        });
      })
      .catch(error => errorAlert(error.message));
  };

  const {
    clearStorageMiddleware,
    saveAccountCurrencyMiddleware,
    storeTokenMiddleware
  } = useAuthMiddleware();

  const { sendRequest: getMetamaskMessage } = useApiRequest({
    middleware: [metamaskSign],
    request: getMetamaskMessageForLogin
  });

  const { sendRequest: loginWithMetamask } = useApiRequest({
    middleware: [
      clearStorageMiddleware,
      storeTokenMiddleware,
      saveAccountCurrencyMiddleware
    ],
    request: loginWithMetamaskRequest
  });

  return (
    <Button
      noPadding
      variant="text"
      onClick={active ? getMetamaskMessage : connectMetamask}
      disabled={isPending}
    >
      {t("auth:login.metamask.button")}
    </Button>
  );
};

const MetamaskLoginButton = withWeb3(React.memo(_MetamaskLoginButton));
export default MetamaskLoginButton;
