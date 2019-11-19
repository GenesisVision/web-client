import "./fund-asset.scss";

import classNames from "classnames";
import { Currency, FundAssetInfo, FundAssetPartWithIcon } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import useAnchor from "shared/hooks/anchor.hook";
import { PlatformAssetFull } from "shared/utils/types";

import FundAsset, { FUND_ASSET_TYPE } from "./fund-asset";
import HidedAssetsLabel from "./hided-assets-label";

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
  useEffect(() => {
    if (hasPopoverList) setSize(sizeProp);
  });
  return (
    <div
      className={classNames("fund-assets", {
        "fund-assets--text": type === FUND_ASSET_TYPE.TEXT
      })}
    >
      {assets.filter(getVisibleAssets(size || assets.length)).map(
        renderFundAsset({
          type,
          removable,
          removeHandle,
          hoveringAsset,
          assetsLength: assets.length
        })
      )}
      {size && size < (length || assets.length) && (
        <HidedFundAssets
          assets={assets}
          setSize={setSize}
          size={size}
          type={type}
          hasPopoverList={hasPopoverList}
          hoveringAsset={hoveringAsset}
          length={length}
          removable={removable}
          removeHandle={removeHandle}
        />
      )}
      {remainder > 0 && (
        <div className="fund-asset fund-asset--remainder">
          <NumberFormat value={remainder} suffix="%" displayType="text" />
        </div>
      )}
    </div>
  );
};

const HidedFundAssets: React.FC<IHidedFundAssetsProps> = React.memo(
  ({
    length,
    assets,
    size,
    type,
    hasPopoverList,
    setSize,
    removable,
    removeHandle,
    hoveringAsset
  }) => {
    const { anchor, setAnchor, clearAnchor } = useAnchor();
    const handleOpen = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        hasPopoverList ? setAnchor(event) : setSize(assets.length);
      },
      [assets.length, hasPopoverList, setAnchor]
    );
    return (
      <>
        <HidedAssetsLabel
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
            {assets.filter(getHidedAssets(size)).map(
              renderFundAsset({
                type,
                removable,
                removeHandle,
                hoveringAsset,
                assetsLength: assets.length
              })
            )}
          </div>
        </Popover>
      </>
    );
  }
);

interface IHidedFundAssetsProps {
  length?: number;
  assets: Array<FundAssetType>;
  type: FUND_ASSET_TYPE;
  size: number;
  hasPopoverList?: boolean;
  setSize: (size: number) => void;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  hoveringAsset?: string;
}

const getVisibleAssets = (size: number) => (
  asset: FundAssetType,
  idx: number
) => idx < size;

const getHidedAssets = (size: number) => (asset: FundAssetType, idx: number) =>
  idx >= size;

const renderFundAsset = ({
  type,
  removable,
  removeHandle,
  hoveringAsset,
  assetsLength
}: {
  type: FUND_ASSET_TYPE;
  removable?: boolean;
  removeHandle?: FundAssetRemoveType;
  hoveringAsset?: string;
  assetsLength: number;
}) => (asset: FundAssetType, idx: number) => (
  <FundAsset
    key={asset.asset}
    {...asset}
    current={"current" in asset ? asset.current : asset.percent}
    target={"target" in asset ? asset.target : asset.percent}
    symbol={asset.asset}
    currency={asset.asset as Currency} //TODO remove when api update
    type={type}
    last={idx === assetsLength - 1}
    removable={removable}
    removeHandle={removeHandle}
    className={hoveringAsset === asset.asset ? "fund-asset--hover" : undefined}
  />
);

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
