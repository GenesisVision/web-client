import * as React from "react";
import BlurContainer, {
  BlurContainer_
} from "shared/components/blur-container/blur-container";

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

export interface WithBlurLoaderProps<T> {
  className?: string;
  loaderData: T;
}

export const withBlurLoader_ = <T, U extends { data?: T }>(
  Component: React.ComponentType<U>
): React.ComponentType<WithBlurLoaderProps<T> & U> => ({
  data,
  loaderData,
  className,
  ...other
}) => (
  <BlurContainer_ blur={!data} className={className}>
    <Component {...other as U} data={data ? data : loaderData} />
  </BlurContainer_>
);

export default withBlurLoader;
