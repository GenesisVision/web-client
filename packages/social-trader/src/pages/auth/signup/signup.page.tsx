import "./signup.scss";

import emailPendingActions from "actions/email-pending-actions";
import { Push } from "components/link/link";
import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import useApiRequest from "hooks/api-request.hook";
import CaptchaContainer from "pages/auth/captcha-container";
import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import { SIGNUP_ROUTE_PENDING } from "pages/auth/signup/signup.constants";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ReduxDispatch } from "utils/types";

import { signUp } from "./services/signup.service";

const _SignUpPage: React.FC<Props> = ({
  referrer,
  utmSource,
  referralCode
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const successMiddleware = (email: string) => {
    dispatch(emailPendingActions.saveEmail({ email }));
    Push(SIGNUP_ROUTE_PENDING);
  };
  const { sendRequest: request, errorMessage } = useApiRequest({
    request: signUp,
    middleware: [successMiddleware]
  });
  return (
    <PageSeoWrapper
      description={"Sign up to the Genesis Vision"}
      title={t("auth.signup.title")}
    >
      <div className="signup">
        <CaptchaContainer
          request={request}
          renderForm={handle => (
            <SignUpForm
              referer={referrer}
              urlParams={utmSource}
              refCode={referralCode}
              onSubmit={handle}
              error={errorMessage}
            />
          )}
        />
      </div>
    </PageSeoWrapper>
  );
};

interface Props {
  referrer?: string;
  referralCode?: string;
  utmSource?: string;
}

const SignUpPage = React.memo(_SignUpPage);
export default SignUpPage;
