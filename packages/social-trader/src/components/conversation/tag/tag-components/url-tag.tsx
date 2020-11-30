import React from "react";

import { IUrlTagProps } from "./tag-components.types";

const _UrlTagComponent: React.FC<IUrlTagProps> = ({
  data: {
    link: { title, url }
  }
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ wordBreak: "break-all" }}
    >
      {title}
    </a>
  );
};
export const UrlTagComponent = React.memo(_UrlTagComponent);
