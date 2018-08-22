import RecoveryCodeContainer from "modules/login/components/recovery-code/recovery-code-container";
import React from "react";
const Recovery = () => {
  return (
    <div>
      <h1>Recovery</h1>
      <p>
        You can enter one of your recovery codes in case you lost access to your
        mobile device.
      </p>
      <RecoveryCodeContainer />
    </div>
  );
};

export default Recovery;
