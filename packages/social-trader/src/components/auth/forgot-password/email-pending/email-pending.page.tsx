import "components/auth/forgot-password/email-pending/email-pending.scss";

import { CaptchaCheckResult } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { AuthRootState, MiddlewareDispatch } from "utils/types";

import CaptchaContainer from "../../captcha-container";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";

const _EmailPendingPage: React.FC<Props> = ({ t, service }) => {
  const email = useSelector((state: AuthRootState) => state.emailPending.email);
  return (
    <div className="password-pending">
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-1")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-2")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-3")}
      </p>
      <CaptchaContainer
        request={service.sendForgotPasswordEmail}
        renderForm={handle => <EmailPending onSubmit={handle} email={email} />}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    sendForgotPasswordEmail: ({ captchaCheckResult }) => {
      dispatch(sendForgotPasswordEmail(captchaCheckResult));
    }
  }
});

interface DispatchProps {
  service: {
    sendForgotPasswordEmail: (values: {
      captchaCheckResult: CaptchaCheckResult;
    }) => void;
  };
}

interface Props extends DispatchProps, WithTranslation {}

const EmailPendingPage = compose<React.ComponentType>(
  translate(),
  connect<null, DispatchProps, AuthRootState>(null, mapDispatchToProps),
  React.memo
)(_EmailPendingPage);
export default EmailPendingPage;
