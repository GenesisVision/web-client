import "shared/components/auth/login/recovery/recovery.scss";

import * as React from "react";
import RecoveryCodeContainer from "shared/components/auth/login/recovery/recovery-code-container";
import { ROLE } from "shared/constants/constants";

const RecoveryPage: React.FC = () => (
  <div className="recovery-page">
    <RecoveryCodeContainer role={ROLE.INVESTOR} />
  </div>
);

export default React.memo(RecoveryPage);
