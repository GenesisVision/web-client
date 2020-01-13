import "./asset-field.scss";

import * as React from "react";

export const AssetContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="asset-content">{children}</div>;
};

export default AssetContent;
