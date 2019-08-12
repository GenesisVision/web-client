import "./fund-asset-tooltip.scss";

import { FundAssetPercent } from "gv-api-web";
import { PlatformAssetFull } from "manager-web-portal/src/pages/funds/fund-settings/reallocation/components/reallocate-field";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";
import { CurrencyEnum } from "shared/utils/types";

import FundAsset from "../fund-asset";
import { IFundAssetContainerProps } from "../fund-asset-container";
import FundAssetTooltip from "./fund-asset-tooltip";

const _FundAssetTooltipContainer: React.FC<Props> = ({
  asset,
  idx,
  assets,
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

interface OwnProps {
  asset: PlatformAssetFull;
  idx: number;
}

interface Props extends OwnProps, IFundAssetContainerProps {}
