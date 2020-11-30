import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import { CurrencyEnum, PlatformAssetFull } from "utils/types";

import FundAsset from "../fund-asset";
import { IFundAssetContainerProps } from "../fund-asset-container";
import FundAssetTooltip from "./fund-asset-tooltip";

const _FundAssetTooltipContainer: React.FC<Props> = ({
  bottomOffset,
  asset,
  idx,
  assetsLength,
  type,
  removable,
  lightTheme,
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
        currentAmount={0}
        bottomOffset={bottomOffset}
        url={asset.url}
        logoUrl={asset.logoUrl}
        current={asset.percent}
        target={asset.mandatoryFundPercent}
        symbol={asset.asset}
        asset={asset.asset}
        currency={asset.asset as CurrencyEnum} //TODO remove when api update
        type={type}
        last={idx === assetsLength - 1}
        removable={removable}
        lightTheme={lightTheme}
        removeHandle={removeHandle}
      />
    </Tooltip>
  );
};

const FundAssetTooltipContainer = React.memo(_FundAssetTooltipContainer);
export default FundAssetTooltipContainer;

interface OwnProps {
  bottomOffset?: boolean;
  assetsLength: number;
  asset: PlatformAssetFull;
  idx: number;
}

interface Props extends OwnProps, IFundAssetContainerProps {}
