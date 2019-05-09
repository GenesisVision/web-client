import * as React from "react";

const withLoader = <T extends { [k: string]: any }>(
  Component: React.ComponentType<T>
): React.ComponentType<WithLoaderProps & T> => props => {
  const { Loader, condition = true } = props;
  if (condition) return <Component {...props} />;
  else if (Loader) return <Loader />;
  return null;
};

export interface WithLoaderProps {
  Loader?: React.ComponentType;
  condition?: boolean;
}
export default withLoader;
