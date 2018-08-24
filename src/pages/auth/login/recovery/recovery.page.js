import React from "react";

import RecoveryCodeContainer from "./recovery-code/recovery-code-container";

const RecoveryPage = () => {
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

export default RecoveryPage;
