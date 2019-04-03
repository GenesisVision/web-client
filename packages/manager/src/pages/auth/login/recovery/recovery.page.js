import "shared/components/auth/login/recovery/recovery.scss";

import React from "react";
import RecoveryCodeContainer from "shared/components/auth/login/recovery/recovery-code-container";

import { MANAGER } from "shared/constants/constants";

const RecoveryPage = () => {
  return (
    <div className="recovery-page">
      <RecoveryCodeContainer role={MANAGER} />
    </div>
  );
};

export default RecoveryPage;
