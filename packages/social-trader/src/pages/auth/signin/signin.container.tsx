import authActions from "actions/auth-actions";
import { getHeader } from "components/header/services/header.service";
import { Push } from "components/link/link";
import useApiRequest from "hooks/api-request.hook";
import useErrorMessage from "hooks/error-message.hook";
import useIsOpen from "hooks/is-open.hook";
import { useParams } from "hooks/location";
import Router from "next/router";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/signin/signin.constants";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import authService from "services/auth-service";
import { setAccountCurrency } from "utils/account-currency";
import { ReduxDispatch, ResponseError } from "utils/types";

import CaptchaContainer, { ValuesType } from "../captcha-container";
import { CODE_TYPE, login, useTwoFactorState } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  redirectFrom,
  type
}) => {
  const { parsedParams } = useParams();
  const [innerFields, setInnerFields] = useState<{
    email?: string;
    password?: string;
  }>({});
  const {
    clearTwoFactorState,
    storeTwoFactorState,
    getTwoFactorState
  } = useTwoFactorState();
  const [disable, setDisable] = useIsOpen();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const dispatch = useDispatch<ReduxDispatch>();
  const storeTokenMiddleware = (value: string) => {
    if (!value) return;
    authService.storeToken(value);
    dispatch(authActions.updateTokenAction(true));
    Push(redirectFrom);
  };
  const saveAccountCurrencyMiddleware = (res: any) => {
    if (res)
      getHeader().then(({ platformCurrency }) => {
        setAccountCurrency(platformCurrency);
      });
  };
  const clearStorageMiddleware = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined")
      localStorage.clear();
  };

  const { email, password = "" } = getTwoFactorState();

  useEffect(() => {
    if (!!email && !!password) setInnerFields({ email, password });
  }, [email, password]);

  const { sendRequest } = useApiRequest({
    middleware: [
      clearStorageMiddleware,
      storeTokenMiddleware,
      saveAccountCurrencyMiddleware
    ],
    request: values => {
      return login({
        ...values,
        type,
        email: values.email || innerFields.email,
        password: values.password || innerFields.password
      }).catch((e: ResponseError) => {
        if (e.code === "RequiresTwoFactor") {
          setDisable();
          storeTwoFactorState({
            email: values.email,
            password: values.password,
            from: redirectFrom
          });
          Push(LOGIN_ROUTE_TWO_FACTOR_ROUTE);
        } else setErrorMessage(e);
      });
    }
  });

  useEffect(() => {
    if (type && (email === "" || password === "")) Router.replace(LOGIN_ROUTE);
    clearTwoFactorState();
  }, []);

  useEffect(() => {
    if (!!parsedParams?.clearToken) authService.removeToken();
  }, [parsedParams]);

  return (
    <div className={className}>
      <CaptchaContainer
        disable={disable}
        request={sendRequest}
        renderForm={handle =>
          renderForm({
            handle,
            email: innerFields.email!,
            errorMessage,
            password: innerFields.password!
          })
        }
      />
    </div>
  );
};

interface Props {
  renderForm: (args: {
    password: string;
    handle: (values: ValuesType) => void;
    email: string;
    errorMessage: string;
  }) => JSX.Element;
  className?: string;
  type?: CODE_TYPE;
  redirectFrom: string;
}

const SignInContainer = React.memo(_SignInContainer);
export default SignInContainer;
