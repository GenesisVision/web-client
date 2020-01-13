import "./asset-field.scss";

import * as React from "react";

export const AssetTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return (
    <div className="asset-title">
      <h1>{children}</h1>
    </div>
  );
};

export default AssetTitle;
