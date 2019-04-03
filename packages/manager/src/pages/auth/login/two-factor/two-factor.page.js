import React from "react";
import TwoFactorCodeContainer from "shared/components/auth/login/two-factor/two-factor-code-container";

import { TWO_FACTOR_CODE } from "shared/components/auth/login/login.actions";
import {
  clearLoginData,
  twoFactorLogin
} from "shared/components/auth/login/login.service";
import { MANAGER } from "shared/constants/constants";

const TwoFactorPage = () => {
  return (
    <div className="login-two-factor-page">
      <TwoFactorCodeContainer
        TWO_FACTOR_CODE={TWO_FACTOR_CODE}
        clearLoginData={clearLoginData}
        twoFactorLogin={twoFactorLogin}
        role={MANAGER}
      />
    </div>
  );
};

export default TwoFactorPage;
