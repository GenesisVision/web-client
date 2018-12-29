import "./signup.scss";

import React from "react";
import { translate } from "react-i18next";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import { SIGNUP_ROUTE } from "../signup.routes";
import SignUpFormContainer from "./components/signup-form/signup-form-container";

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
