import TwoFactorCodeContainer from "modules/login/components/two-factor-code/two-factor-code-container";
import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "pages/auth/login/login.routes";
import React from "react";
import { Link } from "react-router-dom";

const TwoFactor = () => {
  return (
    <div>
      <h1>2fa</h1>
      <p>
        Open the two-factor authentication app on your device to view your
        authentication code and verify your identity.
      </p>
      <TwoFactorCodeContainer />
      <h5>Don’t have your phone?</h5>
      <Link to={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}>
        Enter a two-factor recovery code
      </Link>
    </div>
  );
};

export default TwoFactor;
