import React from "react";
import fileService from "shared/services/file-service";

const withUrl = urlPropertyName => Component => props => {
  const url = fileService.getFileUrl(props[urlPropertyName]);

  return <Component {...props} url={url} />;
};

export default withUrl;
