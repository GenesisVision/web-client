import * as React from "react";
import { BlurContainer } from "shared/components/blur-container/blur-container";
import { TagType } from "shared/utils/types";

export interface WithBlurLoaderProps<T> {
  tag?: TagType;
  className?: string;
  loaderData: T;
}

export const withBlurLoader = <T, U extends { data?: T }>(
  Component: React.ComponentType<U>
): React.ComponentType<WithBlurLoaderProps<T> & U> => ({
  tag,
  data,
  loaderData,
  className,
  ...other
}) => (
  <BlurContainer blur={!data} className={className} tag={tag}>
    <Component {...other as U} data={data ? data : loaderData} />
  </BlurContainer>
);
