import "./signup-email-pending.scss";

import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

const _SignupEmailPending: React.FC<Props & InjectedTranslateProps> = ({
  t,
  service
}) => (
  <GVButton
    className="signup-email-pending__resend-btn"
    variant="text"
    onClick={service.sendConfirmationLink}
  >
    {t("auth.signup-email-pending.resend-button-text")}
  </GVButton>
);

interface Props {
  service: {
    sendConfirmationLink: () => void;
  };
}

const SignupEmailPending = React.memo(translate()(_SignupEmailPending));
export default SignupEmailPending;
