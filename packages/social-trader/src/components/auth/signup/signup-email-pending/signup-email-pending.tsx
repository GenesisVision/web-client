import "./signup-email-pending.scss";

import GVButton from "components/gv-button";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _SignupEmailPending: React.FC<Props & WithTranslation> = ({
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

const SignupEmailPending = translate()(React.memo(_SignupEmailPending));
export default SignupEmailPending;
