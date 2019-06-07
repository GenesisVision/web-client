import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";

const _EmailPending: React.FC<Props> = ({ onResendEmail, t }) => (
  <>
    <div className="password-pending__resend">
      <GVButton variant="text" onClick={onResendEmail}>
        {t("auth.password-restore.email-pending.email-resend-button-text")}
      </GVButton>
    </div>
  </>
);

interface Props extends InjectedTranslateProps {
  onResendEmail: () => void;
}

const EmailPending = translate()(React.memo(_EmailPending));
export default EmailPending;
