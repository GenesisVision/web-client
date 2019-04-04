import * as React from "react";
import TwoFactorCodeContainer from "shared/components/auth/login/two-factor/two-factor-code-container";
import { ROLE } from "shared/constants/constants";

const TwoFactorPage: React.FC = () => (
  <div className="login-two-factor-page">
    <TwoFactorCodeContainer role={ROLE.MANAGER} />
  </div>
);

export default React.memo(TwoFactorPage);
