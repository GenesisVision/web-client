import "components/auth/forgot-password/forgot-password/forgot-password.scss";

import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import { ForgotPasswordViewModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "utils/types";

import CaptchaContainer from "../../captcha-container";
import { forgotPassword } from "../services/forgot-password.service";
import ForgotPassword from "./forgot-password";

const _ForgotPasswordPage: React.FC<Props> = ({ t, errorMessage, service }) => (
  <PageSeoWrapper title={t("auth.password-restore.title")}>
    <div className="forgot-password">
      <p className="forgot-password__text">
        {t("auth.password-restore.forgot-password.text")}
      </p>
      <CaptchaContainer
        request={service.forgotPassword}
        renderForm={handle => (
          <ForgotPassword errorMessage={errorMessage} onSubmit={handle} />
        )}
      />
    </div>
  </PageSeoWrapper>
);

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { isPending, errorMessage } = state.passwordRestoreData.forgot;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    forgotPassword: (formData, setSubmitting) => {
      dispatch(forgotPassword(formData)).catch(() => {
        setSubmitting(false);
      });
    }
  }
});

interface StateProps {
  isPending: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: {
    forgotPassword: (
      values: ForgotPasswordViewModel,
      setSubmitting: SetSubmittingType
    ) => void;
  };
}

interface OwnProps {}

interface Props extends WithTranslation, OwnProps, DispatchProps, StateProps {}

const ForgotPasswordPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ForgotPasswordPage);
export default ForgotPasswordPage;
