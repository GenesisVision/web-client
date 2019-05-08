import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { MiddlewareDispatch, RootThunk } from "shared/utils/types";

const SignupEmailPending: React.FC<Props> = ({ t, service }) => (
  <GVButton
    className="signup-email-pending__resend-btn"
    variant="text"
    onClick={service.sendConfirmationLink}
  >
    {t("auth.signup-email-pending.resend-button-text")}
  </GVButton>
);

const mapDispatchToProps = (
  dispatch: MiddlewareDispatch,
  props: Props
): DispatchProps => ({
  service: {
    sendConfirmationLink: () => dispatch(props.sendConfirmationLink())
  }
});

interface Props extends InjectedTranslateProps, DispatchProps, OwnProps {}

interface OwnProps {
  sendConfirmationLink: () => RootThunk<void>;
}

interface DispatchProps {
  service: {
    sendConfirmationLink: () => void;
  };
}

const SignupEmailPendingContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(SignupEmailPending);
export default SignupEmailPendingContainer;
