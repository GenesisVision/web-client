import DetailsBlockTitleBox from "components/details/details-block-title-box";
import GVTabs, { GVTabsProps } from "components/gv-tabs";
import React from "react";

const DetailsBlockTabs: React.FC<Props> = ({ value, onChange, children }) => {
  return (
    <DetailsBlockTitleBox>
      <GVTabs value={value} onChange={onChange}>
        {children}
      </GVTabs>
    </DetailsBlockTitleBox>
  );
};

interface Props extends GVTabsProps {}

export default DetailsBlockTabs;
