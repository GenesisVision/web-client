import * as React from "react";

const withLoader = <T extends { [k: string]: any }>(
  Component: React.ComponentType<T>
): React.ComponentType<WithLoaderProps & T> => props => {
  const { loader, condition = true } = props;
  if (condition) return <Component {...props} />;
  else if (loader) return loader;
  return null;
};

export interface WithLoaderProps {
  loader?: JSX.Element;
  condition?: boolean;
}
export default withLoader;
