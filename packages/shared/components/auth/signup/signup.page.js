import "./signup.scss";

import React from "react";
import { translate } from "react-i18next";
import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import SignUpFormContainer from "shared/components/auth/signup/signup-form/signup-form-container";
import { SIGNUP_ROUTE } from "shared/components/auth/signup/signup.routes";

const SignUpPage = ({ t }) => {
  return (
    <div className="signup">
      <h1>{t("auth.signup.title")}</h1>
      <AuthTabs authPartUrl={SIGNUP_ROUTE} />
      <SignUpFormContainer />
    </div>
  );
};

export default translate()(SignUpPage);
