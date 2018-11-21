import "./signup.scss";

import React from "react";
import { translate } from "react-i18next";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import SignUpFormContainer from "./components/signup-form/signup-form-container";

const SignUpPage = ({ t }) => {
  return (
    <div className="signup">
      <h1 className="title-common">{t("auth.signup.title")}</h1>
      <AuthTabs />
      <SignUpFormContainer />
    </div>
  );
};

export default translate()(SignUpPage);
