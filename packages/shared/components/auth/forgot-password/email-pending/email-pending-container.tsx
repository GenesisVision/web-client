import * as React from "react";
import { connect } from "react-redux";
import { MiddlewareDispatch } from "shared/utils/types";

import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";

const _EmailPendingContainer: React.FC<Props> = ({ sendEmail }) => (
  <EmailPending onResendEmail={sendEmail} />
);

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  sendEmail: () => {
    dispatch(sendForgotPasswordEmail());
  }
});

interface Props extends OwnProps, DispatchProps {}

interface OwnProps {}

interface DispatchProps {
  sendEmail: () => void;
}

const EmailPendingContainer = React.memo(
  connect<null, DispatchProps, OwnProps>(
    null,
    mapDispatchToProps
  )(_EmailPendingContainer)
);
export default EmailPendingContainer;
