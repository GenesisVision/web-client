import {
  HidedAssetsContainer,
  HidedAssetsCount
} from "components/fund-asset/fund-asset.styles";
import { FundAssetViewType } from "components/fund-asset/fund-asset.types";
import * as React from "react";

const _HidedAssets: React.FC<Props> = ({
  type,
  count,
  handleOpen,
  canExpand = true
}) => {
  switch (type) {
    case "text":
      return <div>... +{count}</div>;
    default:
      return canExpand ? (
        <HidedAssetsContainer onClick={handleOpen}>
          <HidedAssetsCount>+{count}</HidedAssetsCount>
        </HidedAssetsContainer>
      ) : (
          <HidedAssetsCount>+{count}</HidedAssetsCount>
        );
  }
};
const HidedAssetsLabel = React.memo(_HidedAssets);
export default HidedAssetsLabel;

interface Props {
  canExpand?: boolean;
  count: number;
  type: FundAssetViewType;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
}
