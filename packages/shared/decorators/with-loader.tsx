import * as React from "react";

const withLoader = <T extends {}>(
  Component: React.ComponentType<T>
): React.ComponentType<WithLoaderProps & T> => props => {
  const { loader, condition = true, ...other } = props;
  if (condition) return <Component {...(other as T)} />;
  else if (loader) return loader;
  return null;
};

export interface WithLoaderProps {
  loader?: JSX.Element;
  condition?: boolean;
  className?: string;
}
export default withLoader;
