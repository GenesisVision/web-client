import "./signup-page.scss";

import AuthTabs from "components/auth-tabs/auth-tabs";
import SignUpContainer from "modules/signup/components/signup-container";
import React from "react";
import { translate } from "react-i18next";

const SignUp = ({ t }) => {
  return (
    <div className="signup">
      <div className="signup__header">
        <h1 className="signup__heading">{t("auth.signup.title")}</h1>
        <AuthTabs />
      </div>
      <SignUpContainer />
    </div>
  );
};

export default translate()(SignUp);
