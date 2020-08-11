import { Button } from "components/button/button";
import * as React from "react";
import { useTranslation } from "react-i18next";

const SignupEmailPending: React.FC<Props> = ({ sendConfirmationLink }) => {
  const [t] = useTranslation();
  return (
    <Button noPadding variant="text" onClick={sendConfirmationLink}>
      {t("auth:signup-email-pending.resend-button-text")}
    </Button>
  );
};

interface Props {
  sendConfirmationLink: () => void;
}

const SignupEmailPendingContainer = React.memo(SignupEmailPending);
export default SignupEmailPendingContainer;
