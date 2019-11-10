import "./asset-field.scss";

import * as React from "react";

export const _AssetRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return <div className="asset-row">{children}</div>;
};

const AssetRow = React.memo(_AssetRow);
export default AssetRow;
