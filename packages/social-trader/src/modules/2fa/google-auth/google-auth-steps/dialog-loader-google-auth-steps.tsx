import {
  DialogLoaderGoogleAuthDesktop,
  DialogLoaderGoogleAuthMobile
} from "components/dialog/dialog-loader/dialog-loader-google-auth";
import { debounce } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { isTablet } from "utils/breakpoints";

const _DialogLoaderGoogleAuthSteps: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    window.onresize = debounce(() => setInnerWidth(window.innerWidth), 166);
  }, []);
  return isTablet(innerWidth) ? (
    <DialogLoaderGoogleAuthMobile />
  ) : (
    <DialogLoaderGoogleAuthDesktop />
  );
};

const DialogLoaderGoogleAuthSteps = React.memo(_DialogLoaderGoogleAuthSteps);
export default DialogLoaderGoogleAuthSteps;
