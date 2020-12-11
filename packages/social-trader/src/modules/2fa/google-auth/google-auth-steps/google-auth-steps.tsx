import { debounce } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { isTablet } from "utils/breakpoints";

import GoogleAuthDesktop, {
  IGoogleAuthProps
} from "./google-auth-steps-desktop";
import GoogleAuthMobile from "./google-auth-steps-mobile";

interface Props extends IGoogleAuthProps {}

const GoogleAuthSteps: React.FC<Props> = props => {
  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    window.onresize = debounce(() => setInnerWidth(window.innerWidth), 166);
    setInnerWidth(window.innerWidth);
  }, []);
  return isTablet(innerWidth) ? (
    <GoogleAuthMobile {...props} />
  ) : (
    <GoogleAuthDesktop {...props} />
  );
};

const GoogleAuthStepsContainer = React.memo(GoogleAuthSteps);
export default GoogleAuthStepsContainer;
