import * as React from "react";

import { FUND_ASSET_TYPE } from "./fund-asset";

const _HidedAssets: React.FC<Props> = ({ type, count, handleOpen }) => {
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return <div>... +{count}</div>;
    default:
      return (
        <>
          <div
            className="fund-asset__container fund-asset__container--others-count"
            onClick={handleOpen}
          >
            <div className="fund-asset fund-asset--others-count">+{count}</div>
          </div>
        </>
      );
  }
};
const HidedAssetsLabel = React.memo(_HidedAssets);
export default HidedAssetsLabel;

interface Props {
  count: number;
  type: FUND_ASSET_TYPE;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
}
