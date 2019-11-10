import "./asset-field.scss";

import * as React from "react";

export const _AssetContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="asset-content">{children}</div>;
};

const AssetContent = React.memo(_AssetContent);
export default AssetContent;
