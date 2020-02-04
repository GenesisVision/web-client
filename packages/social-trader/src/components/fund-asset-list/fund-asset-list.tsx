import "./fund-assets-list.scss";

import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

const _FundAssetList: React.FC<Props> = ({ values }) => (
  <div className="fund-asset-list">
    {values.map((item: FundAssetPartWithIcon) => (
      <div className="fund-asset-list__item" key={item.name}>
        <div
          className="fund-asset-list__bubble"
          style={{ background: item.color }}
        />
        <div className="fund-asset-list__text">
          {item.name} {item.percent} %
        </div>
      </div>
    ))}
  </div>
);

interface Props {
  values: FundAssetPartWithIcon[];
}

const FundAssetList = React.memo(_FundAssetList);
export default FundAssetList;
