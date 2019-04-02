import React from "react";
import TwoFactorCodeContainer from "shared/components/auth/login/two-factor/two-factor-code-container";

import { twoFactorLogin } from "../services/login.service";
import { TWO_FACTOR_CODE } from "shared/components/auth/login/login.actions";
import { clearLoginData } from "shared/components/auth/login/login.service";

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
