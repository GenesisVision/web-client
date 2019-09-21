import * as React from "react";
import BlurContainer from "shared/components/blur-container/blur-container";

import { WithLoaderProps } from "./with-loader";

const withBlurLoader = <T extends {}>(
  Component: React.ComponentType<T>
): React.ComponentType<WithLoaderProps & T> => ({
  className,
  loader,
  condition = true,
  ...other
}) => (
  <div style={{ position: "relative" }} className={className}>
    <BlurContainer loader show={!!loader && !condition} blur={!condition}>
      {loader}
    </BlurContainer>
    <BlurContainer show={condition} blur={!condition}>
      {condition ? <Component {...other as T} /> : null}
    </BlurContainer>
  </div>
);

export default withBlurLoader;
