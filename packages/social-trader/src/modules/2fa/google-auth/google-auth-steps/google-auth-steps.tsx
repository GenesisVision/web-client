import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { isTablet } from "utils/breakpoints";

import GoogleAuthDesktop, {
  IGoogleAuthProps
} from "./google-auth-steps-desktop";
import GoogleAuthMobile from "./google-auth-steps-mobile";

const GoogleAuthSteps: React.FC<Props> = props => {
  const innerWidth = useSelector(
    (state: RootState) => state.ui.size.innerWidth
  );
  return isTablet(innerWidth) ? (
    <GoogleAuthMobile {...props} />
  ) : (
    <GoogleAuthDesktop {...props} />
  );
};

interface Props extends IGoogleAuthProps {}

const GoogleAuthStepsContainer = React.memo(GoogleAuthSteps);
export default GoogleAuthStepsContainer;
