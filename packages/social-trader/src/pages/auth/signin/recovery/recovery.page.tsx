import "./recovery.scss";

import React from "react";

import SignInContainer from "../signin.container";
import { CODE_TYPE } from "../signin.service";
import RecoveryCodeForm from "./recovery-code-form";

const _RecoveryPage: React.FC<Props> = ({ redirectFrom }) => (
  <SignInContainer
    redirectFrom={redirectFrom}
    type={CODE_TYPE.RECOVERY}
    className="recovery-page"
    renderForm={({ handle, email, errorMessage }) => (
      <RecoveryCodeForm
        onSubmit={handle}
        errorMessage={errorMessage}
        email={email}
      />
    )}
  />
);

interface Props {
  redirectFrom: string;
}

const RecoveryPage = React.memo(_RecoveryPage);
export default RecoveryPage;
