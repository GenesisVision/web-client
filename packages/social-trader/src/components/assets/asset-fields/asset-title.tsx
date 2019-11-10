import "./asset-field.scss";

import * as React from "react";

export const _AssetTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return (
    <div className="asset-title">
      <h1>{children}</h1>
    </div>
  );
};

const AssetTitle = React.memo(_AssetTitle);
export default AssetTitle;
