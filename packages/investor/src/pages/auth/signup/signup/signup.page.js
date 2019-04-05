import "./signup.scss";

import React from "react";
import { translate } from "react-i18next";

import AuthTabs from "shared/components/auth/components/auth-tabs/auth-tabs";
import { SIGNUP_ROUTE } from "../signup.routes";
import SignUpFormContainer from "./components/signup-form/signup-form-container";
import { INVESTOR } from "shared/constants/constants";

const SignUpPage = ({ t }) => {
  return (
    <div className="signup">
      <h1>{t("auth.signup.title")}</h1>
      <AuthTabs authPartUrl={SIGNUP_ROUTE} role={INVESTOR} />
      <SignUpFormContainer />
    </div>
  );
};

export default translate()(SignUpPage);
