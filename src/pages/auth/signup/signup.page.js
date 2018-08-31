import "./signup.scss";

import React from "react";
import { translate } from "react-i18next";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import SignUpFormContainer from "../components/signup-form/signup-form-container";

const SignUpPage = ({ t }) => {
  return (
    <div className="signup">
      <div className="signup__header">
        <h1 className="signup__heading">{t("auth.signup.title")}</h1>
        <AuthTabs />
      </div>
      <SignUpFormContainer />
    </div>
  );
};

export default translate()(SignUpPage);
