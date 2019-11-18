import "./fund-asset.scss";

import classNames from "classnames";
import {
  Currency,
  FundAssetInfo,
  FundAssetPartWithIcon,
  FundAssetPercent
} from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";
import { CurrencyEnum, PlatformAssetFull } from "shared/utils/types";

import FundAsset, { FUND_ASSET_TYPE } from "./fund-asset";
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
        .filter(getVisibleAssets(size || assets.length))
        .map((asset, idx) => (
          <FundAsset
            key={asset.asset}
            {...asset}
            currency={asset.asset as Currency}
            type={type}
            last={idx === assets.length - 1}
            removable={removable}
            removeHandle={removeHandle}
            className={
              hoveringAsset === asset.asset ? "fund-asset--hover" : undefined
            }
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
              {assets.filter(getInvisibleAssets(size)).map((asset, idx) => (
                <FundAsset
                  key={asset.asset}
                  {...asset}
                  currency={asset.asset as Currency} //TODO remove when api update
                  type={type}
                  last={idx === assets.length - 1}
                  removable={removable}
                  removeHandle={removeHandle}
                  className={
                    hoveringAsset === asset.asset
                      ? "fund-asset--hover"
                      : undefined
                  }
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

const getVisibleAssets = (size: number) => (
  asset: FundAssetType,
  idx: number
) => idx < size;

const getInvisibleAssets = (size: number) => (
  asset: FundAssetType,
  idx: number
) => idx >= size;

export type FundAssetRemoveType = (
  currency: string
) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export interface IFundAssetContainerProps {
  assets: Array<FundAssetType>;
  type: FUND_ASSET_TYPE;
  size?: number;
  length?: number;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  remainder?: number;
  hoveringAsset?: string;
  hasPopoverList?: boolean;
}

export type FundAssetType =
  | PlatformAssetFull
  | FundAssetInfo
  | FundAssetPartWithIcon;

const FundAssetContainer = React.memo(_FundAssetContainer);
export default FundAssetContainer;
