import "./recovery.scss";

import React from "react";
import { translate } from "react-i18next";

import RecoveryCodeContainer from "./recovery-code/recovery-code-container";

const RecoveryPage = ({ t }) => {
  return (
    <div className="recovery-page">
      <RecoveryCodeContainer />
    </div>
  );
};

export default translate()(RecoveryPage);
