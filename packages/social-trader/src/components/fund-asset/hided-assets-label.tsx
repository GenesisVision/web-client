import { Row } from "components/row/row";
import * as React from "react";

import { FUND_ASSET_TYPE } from "./fund-asset";

const _HidedAssets: React.FC<Props> = ({ type, count, handleOpen }) => {
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return <div>... +{count}</div>;
    default:
      return (
        <div
          className="fund-asset__container--others-count"
          onClick={handleOpen}
        >
          <Row className="fund-asset fund-asset--others-count">+{count}</Row>
        </div>
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
