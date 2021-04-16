import authActions from "actions/auth-actions";
import { Button } from "components/button/button";
import { getHeader } from "components/header/services/header.service";
import { Push } from "components/link/link";
import useApiRequest from "hooks/api-request.hook";
import { useTranslation } from "i18n";
import { metamaskSign } from "modules/bsc-investing/bsc-investing.service";
import React from "react";
import { useDispatch } from "react-redux";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";
import { setAccountCurrency } from "utils/account-currency";

import {
  getMetamaskMessageForLogin,
  loginWithMetamask
} from "../signin.service";

interface Props {}

const _MetamaskLoginButton: React.FC<Props> = () => {
  const [t] = useTranslation();

  const dispatch = useDispatch();

  const clearStorageMiddleware = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined")
      localStorage.clear();
  };
  const saveAccountCurrencyMiddleware = (res: any) => {
    if (res)
      getHeader().then(({ platformCurrency }) => {
        setAccountCurrency(platformCurrency);
      });
  };
  const storeTokenMiddleware = (value: string) => {
    if (!value) return;
    authService.storeToken(value);
    dispatch(authActions.updateTokenAction(true));
    Push(DASHBOARD_ROUTE);
  };

  const { sendRequest: fetchMetamaskMessage } = useApiRequest({
    middleware: [
      data =>
        metamaskSign(data.message).then(res => {
          sendRequest({
            signature: res.signature,
            messageId: data.id,
            address: res.accountAddress
          }).catch(err => console.log(err));
        })
    ],
    request: getMetamaskMessageForLogin
  });

  const { sendRequest } = useApiRequest({
    middleware: [
      clearStorageMiddleware,
      storeTokenMiddleware,
      saveAccountCurrencyMiddleware
    ],
    request: loginWithMetamask
  });

  return (
    <>
      <Button noPadding variant="text" onClick={fetchMetamaskMessage}>
        {t("auth:login.metamask.button")}
      </Button>
    </>
  );
};

const MetamaskLoginButton = React.memo(_MetamaskLoginButton);
export default MetamaskLoginButton;
