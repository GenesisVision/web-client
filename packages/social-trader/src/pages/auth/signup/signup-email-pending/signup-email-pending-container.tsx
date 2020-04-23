import GVButton from "components/gv-button";
import * as React from "react";
import { useTranslation } from "react-i18next";

const SignupEmailPending: React.FC<Props> = ({ sendConfirmationLink }) => {
  const [t] = useTranslation();
  return (
    <GVButton noPadding variant="text" onClick={sendConfirmationLink}>
      {t("auth.signup-email-pending.resend-button-text")}
    </GVButton>
  );
};

interface Props {
  sendConfirmationLink: () => void;
}

const SignupEmailPendingContainer = React.memo(SignupEmailPending);
export default SignupEmailPendingContainer;
