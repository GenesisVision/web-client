import "shared/components/auth/login/recovery/recovery.scss";

import React from "react";
import RecoveryCodeContainer from "shared/components/auth/login/recovery/recovery-code-container";

import { twoFactorLogin } from "../services/login.service";
import { RECOVERY_CODE } from "shared/components/auth/login/login.actions";
import { clearLoginData } from "shared/components/auth/login/login.service";

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
