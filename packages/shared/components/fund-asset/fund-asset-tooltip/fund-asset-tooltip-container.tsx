import "./fund-asset-tooltip.scss";

import { FundAssetPercent } from "gv-api-web";
import * as React from "react";
import { CurrencyEnum } from "shared/utils/types";

import Tooltip from "../../tooltip/tooltip";
import FundAsset from "../fund-asset";
import { IFundAssetContainerProps } from "../fund-asset-container";
import FundAssetTooltip from "./fund-asset-tooltip";

interface OwnProps {
  asset: FundAssetPercent;
  idx: number;
}

interface Props extends OwnProps, IFundAssetContainerProps {}

const _FundAssetTooltipContainer: React.FC<Props> = ({
  asset,
  idx,
  assets,
  type,
  removable,
  removeHandle,
  hoveringAsset
}) => {
  // const { assets, type, removable, removeHandle, hoveringAsset } = props;
  return (
    <Tooltip
      key={idx}
      render={() => (
        <FundAssetTooltip
          name={asset.name}
          currency={asset.asset as CurrencyEnum} //TODO remove when api update
        />
      )}
    >
      <FundAsset
        {...asset}
        currency={asset.asset as CurrencyEnum} //TODO remove when api update
        type={type}
        last={idx === assets.length - 1}
        removable={removable}
        removeHandle={removeHandle}
        className={
          hoveringAsset === asset.asset ? "fund-asset--hover" : undefined
        }
      />
    </Tooltip>
  );
};

const FundAssetTooltipContainer = React.memo(_FundAssetTooltipContainer);
export default FundAssetTooltipContainer;
