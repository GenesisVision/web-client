import "shared/components/auth/login/recovery/recovery.scss";

import * as React from "react";
import CaptchaContainer from "shared/components/auth/login/captcha-container";
import { CODE_TYPE } from "shared/components/auth/login/login.actions";
import RecoveryCodeForm from "shared/components/auth/login/recovery/recovery-code-form";

const RecoveryPage: React.FC = () => (
  <div className="recovery-page">
    <CaptchaContainer
      type={CODE_TYPE.RECOVERY}
      renderForm={(handle, errorMessage) => (
        <RecoveryCodeForm onSubmit={handle} error={errorMessage} />
      )}
    />
  </div>
);

export default React.memo(RecoveryPage);
