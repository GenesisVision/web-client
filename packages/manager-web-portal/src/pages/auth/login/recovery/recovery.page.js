import "./recovery.scss";

import React from "react";

import RecoveryCodeContainer from "./recovery-code/recovery-code-container";

const RecoveryPage = () => {
  return (
    <div className="recovery-page">
      <RecoveryCodeContainer />
    </div>
  );
};

export default RecoveryPage;
