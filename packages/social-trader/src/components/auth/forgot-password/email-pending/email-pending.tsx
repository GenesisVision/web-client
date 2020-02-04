import GVButton from "components/gv-button";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _EmailPending: React.FC<Props> = ({ onSubmit, t, email }) => (
  <div className="password-pending__resend">
    <GVButton variant="text" onClick={() => onSubmit({ email })}>
      {t("auth.password-restore.email-pending.email-resend-button-text")}
    </GVButton>
  </div>
);

interface Props extends WithTranslation {
  onSubmit: (values: { email: string }) => void;
  email: string;
}

const EmailPending = translate()(React.memo(_EmailPending));
export default EmailPending;
