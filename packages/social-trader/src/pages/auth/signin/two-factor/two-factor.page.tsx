import * as React from "react";

import { CODE_TYPE } from "../signin.actions";
import SignInContainer from "../signin.container";
import TwoFactorCodeForm from "./two-factor-code-form";

const _TwoFactorPage: React.FC<Props> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    type={CODE_TYPE.TWO_FACTOR}
    className="login-two-factor-page"
    renderForm={(handle, email, errorMessage) => (
      <TwoFactorCodeForm onSubmit={handle} error={errorMessage} email={email} />
    )}
  />
);

interface Props {
  redirectFrom: string;
}

const TwoFactorPage = React.memo(_TwoFactorPage);
export default TwoFactorPage;
