import "./signup.scss";

import { PageSeoWrapper } from "components/page/page-seo-wrapper";
import { RegisterViewModel } from "gv-api-web";
import CaptchaContainer from "pages/auth/captcha-container";
import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AuthRootState, ReduxDispatch } from "utils/types";

import { signUp } from "./services/signup.service";

const _SignUpPage: React.FC<Props> = ({
  referrer,
  utmSource,
  referralCode
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  const [t] = useTranslation();
  const request = useCallback((values: RegisterViewModel) => {
    return dispatch(signUp(values));
  }, []);
  const errorMessage = useSelector(
    (state: AuthRootState) => state.signUpData.errorMessage
  );
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
