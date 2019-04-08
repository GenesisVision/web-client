import "shared/components/auth/login/recovery/recovery.scss";

import * as React from "react";
import { ROLE } from "shared/constants/constants";
import CaptchaContainer from "shared/components/auth/login/captcha-container";
import { SetSubmittingFuncType } from "shared/components/auth/login/login.service";
import { CODE_TYPE } from "shared/components/auth/login/login.actions";
import RecoveryCodeForm from "shared/components/auth/login/recovery/recovery-code-form";

const RecoveryPage: React.FC = () => (
  <div className="recovery-page">
    <CaptchaContainer
      role={ROLE.INVESTOR}
      type={CODE_TYPE.RECOVERY}
      renderForm={(
        handle: (
          loginFormData: Object,
          setSubmitting: SetSubmittingFuncType
        ) => void,
        errorMessage: string
      ) => <RecoveryCodeForm onSubmit={handle} error={errorMessage} />}
    />
  </div>
);

export default React.memo(RecoveryPage);
