import "./signup-email-pending.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const _SignupEmailPending = ({ t, service }) => (
  <GVButton
    className="signup-email-pending__resend-btn"
    variant="text"
    onClick={service.sendConfirmationLink}
  >
    {t("auth.signup-email-pending.resend-button-text")}
  </GVButton>
);

const SignupEmailPending = translate()(_SignupEmailPending);
export default SignupEmailPending;
