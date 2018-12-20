import "shared/components/auth/login/recovery/recovery.scss";

import React from "react";
import RecoveryCodeContainer from "shared/components/auth/login/recovery/recovery-code-container";

import { RECOVERY_CODE } from "../actions/login.actions";
import { clearLoginData, twoFactorLogin } from "../services/login.service";

const RecoveryPage = () => {
  return (
    <div className="recovery-page">
      <RecoveryCodeContainer
        RECOVERY_CODE={RECOVERY_CODE}
        clearLoginData={clearLoginData}
        twoFactorLogin={twoFactorLogin}
      />
    </div>
  );
};

export default RecoveryPage;
