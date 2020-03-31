import * as React from "react";

const withUrl = <T extends { [k: string]: any }>(urlPropertyName: keyof T) => (
  Component: React.ComponentType<T>
): React.ComponentType<T & { url: string }> => (props: T) => {
  const url = props[urlPropertyName];
  return <Component {...props} url={url} />;
};

export default withUrl;
