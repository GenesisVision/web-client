import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import Router from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthRootState, SetSubmittingType } from "utils/types";

import CaptchaContainer, { ValuesType } from "../captcha-container";
import { CODE_TYPE, loginUserAction } from "./signin.actions";
import { clearLoginData, login } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  redirectFrom,
  type
}) => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(
    (state: AuthRootState) => state.loginData.login
  );
  const { email, password } = useSelector(
    (state: AuthRootState) => state.loginData.twoFactor
  );
  useEffect(() => {
    dispatch(clearLoginData);
  }, []);
  useEffect(() => {
    if (type && (email === "" || password === ""))
      Router.replace(NOT_FOUND_PAGE_ROUTE);
  }, []);
  return (
    <div className={className}>
      <CaptchaContainer
        request={dispatch(login(loginUserAction, redirectFrom, type))}
        renderForm={handle => renderForm(handle, email, errorMessage)}
      />
    </div>
  );
};

interface Props {
  renderForm: (
    handle: (values: ValuesType, setSubmitting?: SetSubmittingType) => void,
    email: string,
    errorMessage: string
  ) => JSX.Element;
  className: string;
  type?: CODE_TYPE;
  redirectFrom: string;
}

const SignInContainer = React.memo(_SignInContainer);
export default SignInContainer;
