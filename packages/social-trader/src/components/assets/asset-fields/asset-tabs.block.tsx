import "./asset-tabs.scss";

import GVTabs, { GVTabsProps } from "components/gv-tabs";
import React from "react";

export const AssetTabsBlock: React.FC<Props> = ({ children, value }) => {
  return (
    <div className="asset-tabs">
      <GVTabs value={value}>{children}</GVTabs>
    </div>
  );
};

interface Props extends GVTabsProps {}
