import "./recovery.scss";

import { LocationState } from "history";
import * as React from "react";

import { CODE_TYPE } from "../signin.actions";
import SignInContainer from "../signin.container";
import RecoveryCodeForm from "./recovery-code-form";

const _RecoveryPage: React.FC<LocationProps> = ({ location }) => (
  <SignInContainer
    location={location}
    type={CODE_TYPE.RECOVERY}
    className="recovery-page"
    renderForm={(handle, email, errorMessage) => (
      <RecoveryCodeForm onSubmit={handle} error={errorMessage} email={email} />
    )}
  />
);

interface LocationProps {
  location: LocationState;
}

const RecoveryPage = React.memo(_RecoveryPage);
export default RecoveryPage;
