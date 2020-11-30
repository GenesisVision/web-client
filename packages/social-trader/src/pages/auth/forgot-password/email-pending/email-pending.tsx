import { Button } from "components/button/button";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _EmailPending: React.FC<Props> = ({ onSubmit, email }) => {
  const [t] = useTranslation();
  return (
    <Button noPadding variant="text" onClick={() => onSubmit({ email })}>
      {t("auth:password-restore.email-pending.email-resend-button-text")}
    </Button>
  );
};

interface Props {
  onSubmit: (values: { email: string }) => void;
  email: string;
}

const EmailPending = React.memo(_EmailPending);
export default EmailPending;
