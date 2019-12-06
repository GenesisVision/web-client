import "./details-block-tabs.scss";

import GVTabs, { GVTabsProps } from "components/gv-tabs";
import React from "react";

const _DetailsBlockTabs: React.FC<Props> = ({ value, onChange, children }) => {
  return (
    <div className="details-block-tabs">
      <GVTabs value={value} onChange={onChange}>
        {children}
      </GVTabs>
    </div>
  );
};

interface Props extends GVTabsProps {}

const DetailsBlockTabs = React.memo(_DetailsBlockTabs);
export default DetailsBlockTabs;
