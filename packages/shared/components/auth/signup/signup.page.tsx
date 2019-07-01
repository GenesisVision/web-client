import "./signup.scss";

import SignUpForm from "pages/auth/signup/signup-form/signup-form";
import * as React from "react";
import { translate } from "react-i18next";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { SIGNUP_ROUTE } from "shared/routes/app.routes";
import { getRef } from "shared/utils/ref";

import CaptchaContainer from "./captcha-container";

const _SignUpPage: React.FC = () => {
  const refCode = getRef();
  return (
    <div className="signup">
      <AuthTabs authPartUrl={SIGNUP_ROUTE} />
      <CaptchaContainer
        renderForm={(handle, errorMessage) => (
          <SignUpForm
            refCode={refCode}
            onSubmit={handle}
            error={errorMessage}
          />
        )}
      />
    </div>
  );
};

const SignUpPage = translate()(React.memo(_SignUpPage));
export default SignUpPage;
