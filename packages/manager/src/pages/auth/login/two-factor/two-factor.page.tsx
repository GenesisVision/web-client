import * as React from "react";
import { ROLE } from "shared/constants/constants";
import { CODE_TYPE } from "shared/components/auth/login/login.actions";
import TwoFactorCodeForm from "shared/components/auth/login/two-factor/two-factor-code-form";
import CaptchaContainer from "shared/components/auth/login/captcha-container";

const TwoFactorPage: React.FC = () => (
  <div className="login-two-factor-page">
    <CaptchaContainer
      role={ROLE.INVESTOR}
      type={CODE_TYPE.TWO_FACTOR}
      renderForm={(handle, errorMessage) => (
        <TwoFactorCodeForm onSubmit={handle} error={errorMessage} />
      )}
    />
  </div>
);

export default React.memo(TwoFactorPage);
