import "shared/components/auth/login/recovery/recovery.scss";

import * as React from "react";
import { ROLE } from "shared/constants/constants";
import { CODE_TYPE } from "shared/components/auth/login/login.actions";
import RecoveryCodeForm from "shared/components/auth/login/recovery/recovery-code-form";
import CaptchaContainer from "shared/components/auth/login/captcha-container";

const RecoveryPage: React.FC = () => (
  <div className="recovery-page">
    const RecoveryPage: React.FC = () => (
    <div className="recovery-page">
      <CaptchaContainer
        role={ROLE.INVESTOR}
        type={CODE_TYPE.RECOVERY}
        renderForm={(handle, errorMessage) => (
          <RecoveryCodeForm onSubmit={handle} error={errorMessage} />
        )}
      />
    </div>
    );
  </div>
);

export default React.memo(RecoveryPage);
