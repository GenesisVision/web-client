import "shared/components/auth/login/recovery/recovery.scss";

import React from "react";
import RecoveryCodeContainer from "shared/components/auth/login/recovery/recovery-code-container";

import {
  clearLoginData,
  twoFactorLogin
} from "shared/components/auth/login/login.service";
import { RECOVERY_CODE } from "shared/components/auth/login/login.actions";
import { MANAGER } from "shared/constants/constants";

const RecoveryPage = () => {
  return (
    <div className="recovery-page">
      <RecoveryCodeContainer
        RECOVERY_CODE={RECOVERY_CODE}
        clearLoginData={clearLoginData}
        twoFactorLogin={twoFactorLogin}
        role={MANAGER}
      />
    </div>
  );
};

export default RecoveryPage;
