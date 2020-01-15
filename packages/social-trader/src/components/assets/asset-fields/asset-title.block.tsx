import "./asset-field.scss";

import * as React from "react";

export const AssetTitleBlock: React.FC = ({ children }) => {
  return (
    <div className="asset-title">
      <h1>{children}</h1>
    </div>
  );
};
