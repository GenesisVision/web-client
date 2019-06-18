import "./signup.scss";

import * as React from "react";
import { translate } from "react-i18next";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import SignUpFormContainer from "shared/components/auth/signup/signup-form/signup-form-container";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";

const _SignUpPage: React.FC = () => (
  <div className="signup">
    <AuthTabs authPartUrl={SIGNUP_ROUTE} />
    <SignUpFormContainer />
  </div>
);

const SignUpPage = translate()(React.memo(_SignUpPage));
export default SignUpPage;
