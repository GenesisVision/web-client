import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import { CaptchaCheckResult } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { AuthRootState, MiddlewareDispatch } from "shared/utils/types";

import CaptchaContainer from "../../captcha-container";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";

const _EmailPendingPage: React.FC<Props> = ({ t, service, email }) => (
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

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { email } = state.emailPending;
  return { email };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    sendForgotPasswordEmail: ({ captchaCheckResult }) => {
      dispatch(sendForgotPasswordEmail(captchaCheckResult));
    }
  }
});

interface StateProps {
  email: string;
}

interface DispatchProps {
  service: {
    sendForgotPasswordEmail: (values: {
      captchaCheckResult: CaptchaCheckResult;
    }) => void;
  };
}

interface OwnProps {
  renderForm: (handle: () => void) => JSX.Element;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithTranslation {}

const EmailPendingPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_EmailPendingPage);
export default EmailPendingPage;
