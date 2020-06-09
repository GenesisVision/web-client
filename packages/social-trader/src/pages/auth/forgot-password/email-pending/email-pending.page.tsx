import { Row } from "components/row/row";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import { useEmailPendingState } from "pages/auth/auth.service";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CaptchaContainer from "../../captcha-container";
import { sendForgotPasswordEmail } from "../services/forgot-password.service";
import EmailPending from "./email-pending";
import styles from "./email-pending.module.scss";

const EmailPendingPage: React.FC = () => {
  const [t] = useTranslation();
  const { getEmailPendingState } = useEmailPendingState();
  const { email } = getEmailPendingState();
  const { sendRequest: request } = useApiRequest({
    request: values => {
      return sendForgotPasswordEmail({ ...values, email });
    },
    successMessage: "auth.password-restore.resend-email-alert-message"
  });
  return (
    <div className={styles["password-pending"]}>
      <Row small>
        <Text muted>
          {t("auth.password-restore.email-pending.text-section-1")}
        </Text>
      </Row>
      <Row small>
        <Text muted>
          {t("auth.password-restore.email-pending.text-section-2")}
        </Text>
      </Row>
      <Row small>
        <Text muted>
          {t("auth.password-restore.email-pending.text-section-3")}
        </Text>
      </Row>
      <Row>
        <CaptchaContainer
          request={request}
          renderForm={handle => (
            <EmailPending onSubmit={handle} email={email} />
          )}
        />
      </Row>
    </div>
  );
};

export default EmailPendingPage;
