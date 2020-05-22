import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { useEmailPendingState } from "pages/auth/auth.service";
import CaptchaContainer from "pages/auth/captcha-container";
import { sendConfirmationLink } from "pages/auth/signup/services/signup-email-pending.service";
import SignupEmailPendingContainer from "pages/auth/signup/signup-email-pending/signup-email-pending-container";
import React from "react";
import { useTranslation } from "react-i18next";

const _EmailPending: React.FC = () => {
  const [t] = useTranslation();
  const { getEmailPendingState } = useEmailPendingState();
  const { email } = getEmailPendingState();
  return (
    <div>
      <h3>{t("auth.signup.email-confirm-title")}</h3>
      <Row>
        <MutedText noWrap={false}>
          {t("auth.signup-email-pending.text-section")}
        </MutedText>
      </Row>
      <Row>
        <CaptchaContainer
          request={sendConfirmationLink(email)}
          renderForm={handle => (
            <SignupEmailPendingContainer
              sendConfirmationLink={() => handle({ email })}
            />
          )}
        />
      </Row>
    </div>
  );
};

const EmailPending = React.memo(_EmailPending);
export default EmailPending;
