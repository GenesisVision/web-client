import "./fund-asset.scss";

import classNames from "classnames";
import { FundAssetPercent } from "gv-api-web";
import { PlatformAssetFull } from "manager-web-portal/src/pages/funds/fund-settings/reallocation/components/reallocate-field";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";

import { FUND_ASSET_TYPE } from "./fund-asset";
import FundAssetTooltipContainer from "./fund-asset-tooltip/fund-asset-tooltip-container";
import HidedAssets from "./hided-assets";

const _FundAssetContainer: React.FC<IFundAssetContainerProps> = ({
  assets,
  type,
  length,
  remainder = 0,
  size: sizeProp,
  hasPopoverList,
  removable,
  removeHandle,
  hoveringAsset
}) => {
  const [size, setSize] = useState<number | undefined>(sizeProp);
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      hasPopoverList ? setAnchor(event) : setSize(assets.length);
    },
    [assets.length, hasPopoverList, setAnchor]
  );
  useEffect(() => {
    if (hasPopoverList) setSize(sizeProp);
  });
  return (
    <div
      className={classNames("fund-assets", {
        "fund-assets--text": type === FUND_ASSET_TYPE.TEXT
      })}
    >
      {assets
        .filter((asset, idx) => idx < (size || assets.length))
        .map((asset, idx) => (
          <FundAssetTooltipContainer
            key={idx}
            asset={asset as PlatformAssetFull}
            idx={idx}
            assets={assets}
            type={type}
            removable={removable}
            removeHandle={removeHandle}
            hoveringAsset={hoveringAsset}
          />
        ))}
      {size && size < (length || assets.length) && (
        <>
          <HidedAssets
            count={(length || assets.length) - size}
            type={type}
            handleOpen={handleOpen}
          />
          <Popover
            horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
            vertical={VERTICAL_POPOVER_POS.TOP}
            anchorEl={anchor}
            noPadding
            onClose={clearAnchor}
          >
            <div className="fund-assets__container">
              {assets
                .filter((asset, idx) => idx >= size)
                .map((asset, idx) => (
                  <FundAssetTooltipContainer
                    key={idx}
                    asset={asset as PlatformAssetFull}
                    idx={idx}
                    assets={assets}
                    type={type}
                    removable={removable}
                    removeHandle={removeHandle}
                    hoveringAsset={hoveringAsset}
                  />
                ))}
            </div>
          </Popover>
        </>
      )}
      {remainder > 0 && (
        <div className="fund-asset fund-asset--remainder">
          <NumberFormat value={remainder} suffix="%" displayType="text" />
        </div>
      )}
    </div>
  );
};

export type FundAssetRemoveType = (
  currency: string
) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export interface IFundAssetContainerProps {
  assets: Array<PlatformAssetFull | FundAssetPercent>;
  type: FUND_ASSET_TYPE;
  size?: number;
  length?: number;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  remainder?: number;
  hoveringAsset?: string;
  hasPopoverList?: boolean;
}

const FundAssetContainer = React.memo(_FundAssetContainer);
export default FundAssetContainer;
