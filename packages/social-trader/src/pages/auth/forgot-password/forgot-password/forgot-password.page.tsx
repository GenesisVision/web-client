import "pages/auth/forgot-password/forgot-password/forgot-password.scss";

import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import { ForgotPasswordViewModel } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AuthRootState, ReduxDispatch } from "utils/types";

import CaptchaContainer from "../../captcha-container";
import { forgotPassword } from "../services/forgot-password.service";
import ForgotPassword from "./forgot-password";

const ForgotPasswordPage: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const request = useCallback((values: ForgotPasswordViewModel) => {
    return dispatch(forgotPassword(values));
  }, []);
  const errorMessage = useSelector(
    (state: AuthRootState) => state.passwordRestoreData.forgot.errorMessage
  );
  return (
    <PageSeoWrapper title={t("auth.password-restore.title")}>
      <div className="forgot-password">
        <p className="forgot-password__text">
          {t("auth.password-restore.forgot-password.text")}
        </p>
        <CaptchaContainer
          request={request}
          renderForm={handle => (
            <ForgotPassword errorMessage={errorMessage} onSubmit={handle} />
          )}
        />
      </div>
    </PageSeoWrapper>
  );
};

export default ForgotPasswordPage;
