import "./fund-asset-tooltip.scss";

import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import { CurrencyEnum, PlatformAssetFull } from "utils/types";

import FundAsset from "../fund-asset";
import { IFundAssetContainerProps } from "../fund-asset-container";
import FundAssetTooltip from "./fund-asset-tooltip";

const _FundAssetTooltipContainer: React.FC<Props> = ({
  asset,
  idx,
  assetsLength,
  type,
  removable,
  removeHandle,
  hoveringAsset
}) => {
  return (
    <Tooltip
      render={() => (
        <FundAssetTooltip
          name={asset.name}
          currency={asset.asset as CurrencyEnum} //TODO remove when api update
        />
      )}
    >
      <FundAsset
        url={asset.url}
        current={asset.percent}
        target={asset.mandatoryFundPercent}
        symbol={asset.asset}
        asset={asset.asset}
        icon={asset.icon}
        currency={asset.asset as CurrencyEnum} //TODO remove when api update
        type={type}
        last={idx === assetsLength - 1}
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

interface OwnProps {
  assetsLength: number;
  asset: PlatformAssetFull;
  idx: number;
}

interface Props extends OwnProps, IFundAssetContainerProps {}
