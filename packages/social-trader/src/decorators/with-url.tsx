import * as React from "react";
import fileService from "services/file-service";

const withUrl = <T extends { [k: string]: any }>(urlPropertyName: keyof T) => (
  Component: React.ComponentType<T>
): React.ComponentType<T & { url: string }> => (props: T) => {
  const url = fileService.getFileUrl(props[urlPropertyName]);
  return <Component {...props} url={url} />;
};

export default withUrl;
