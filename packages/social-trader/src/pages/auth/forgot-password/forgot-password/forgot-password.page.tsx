import { Push } from "components/link/link";
import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import { Row } from "components/row/row";
import { ForgotPasswordViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { useEmailPendingState } from "pages/auth/auth.service";
import { EMAIL_PENDING_ROUTE } from "pages/auth/forgot-password/forgot-password.routes";
import "pages/auth/forgot-password/forgot-password/forgot-password.scss";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CaptchaContainer from "../../captcha-container";
import { forgotPassword } from "../services/forgot-password.service";
import ForgotPassword from "./forgot-password";

const ForgotPasswordPage: React.FC = () => {
  const [t] = useTranslation();
  const { storeEmailPendingState } = useEmailPendingState();

  const successMiddleware = (body: ForgotPasswordViewModel) => {
    storeEmailPendingState(body);
    Push(EMAIL_PENDING_ROUTE);
  };
  const { sendRequest: request, errorMessage } = useApiRequest({
    request: forgotPassword,
    middleware: [successMiddleware]
  });

  return (
    <PageSeoWrapper title={t("auth.password-restore.title")}>
      <div className="forgot-password">
        <p className="forgot-password__text">
          {t("auth.password-restore.forgot-password.text")}
        </p>
        <Row large>
          <CaptchaContainer
            request={request}
            renderForm={handle => (
              <ForgotPassword errorMessage={errorMessage} onSubmit={handle} />
            )}
          />
        </Row>
      </div>
    </PageSeoWrapper>
  );
};

export default ForgotPasswordPage;
