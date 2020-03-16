import "./asset-row.scss";

import * as React from "react";

export const AssetRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="asset-row">{children}</div>;
};

export default AssetRow;
