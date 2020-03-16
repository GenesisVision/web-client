import * as React from "react";

import SignInContainer from "../signin.container";
import { CODE_TYPE } from "../signin.service";
import TwoFactorCodeForm from "./two-factor-code-form";

const _TwoFactorPage: React.FC<Props> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    type={CODE_TYPE.TWO_FACTOR}
    className="login-two-factor-page"
    renderForm={({ handle, email, errorMessage, password }) => (
      <TwoFactorCodeForm
        onSubmit={handle}
        error={errorMessage}
        email={email}
        password={password}
      />
    )}
  />
);

interface Props {
  redirectFrom: string;
}

const TwoFactorPage = React.memo(_TwoFactorPage);
export default TwoFactorPage;
