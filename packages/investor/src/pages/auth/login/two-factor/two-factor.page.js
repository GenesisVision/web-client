import React from "react";

import TwoFactorCodeContainer from "shared/components/auth/login/two-factor/two-factor-code-container";
import { TWO_FACTOR_CODE } from "../actions/login.actions";
import { clearLoginData, twoFactorLogin } from "../services/login.service";

const TwoFactorPage = () => {
  return (
    <div className="login-two-factor-page">
      <TwoFactorCodeContainer
        TWO_FACTOR_CODE={TWO_FACTOR_CODE}
        clearLoginData={clearLoginData}
        twoFactorLogin={twoFactorLogin}
      />
    </div>
  );
};

export default TwoFactorPage;
