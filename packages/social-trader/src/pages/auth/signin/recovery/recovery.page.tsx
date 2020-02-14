import "./recovery.scss";

import React from "react";

import { CODE_TYPE } from "../signin.actions";
import SignInContainer from "../signin.container";
import RecoveryCodeForm from "./recovery-code-form";

const _RecoveryPage: React.FC<Props> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    type={CODE_TYPE.RECOVERY}
    className="recovery-page"
    renderForm={(handle, email, errorMessage) => (
      <RecoveryCodeForm onSubmit={handle} error={errorMessage} email={email} />
    )}
  />
);

interface Props {
  redirectFrom: string;
}

const RecoveryPage = React.memo(_RecoveryPage);
export default RecoveryPage;
