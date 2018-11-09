import React from "react";

import TwoFactorCodeContainer from "./two-factor-code/two-factor-code-container";

const TwoFactorPage = () => {
  return (
    <div className="login-two-factor-page">
      <TwoFactorCodeContainer />
    </div>
  );
};

export default TwoFactorPage;
