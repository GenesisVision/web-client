import { BlurContainer } from "components/blur-container/blur-container";
import * as React from "react";
import { TagType } from "utils/types";

export interface WithBlurLoaderProps<T> {
  tag?: TagType;
  className?: string;
  loaderData?: T;
}

export const withBlurLoader = <T, U extends { data?: T }>(
  Component: React.ComponentType<U>
): React.ComponentType<WithBlurLoaderProps<T> & U> => ({
  tag,
  data,
  loaderData,
  className,
  ...other
}) => {
  const hasData = data !== undefined && data !== null;
  return (
    <BlurContainer blur={!hasData} className={className} tag={tag}>
      <Component {...(other as U)} data={hasData ? data : loaderData} />
    </BlurContainer>
  );
};
