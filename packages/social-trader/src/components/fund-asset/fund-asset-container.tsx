import {
  FundAssetRemainder,
  FundAssets,
  FundAssetsContainer
} from "components/fund-asset/fund-asset.styles";
import { FundAssetViewType } from "components/fund-asset/fund-asset.types";
import FundAssetTooltipContainer from "components/fund-asset/fund-asset-tooltip/fund-asset-tooltip-container";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import {
  FundAssetInfo,
  FundAssetPartWithIcon,
  FundAssetPercent
} from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React, { useCallback, useEffect, useState } from "react";
import { PlatformAssetFull } from "utils/types";

import HidedAssetsLabel from "./hided-assets-label";

export type FundAssetRemoveType = (
  currency: string
) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

export interface IFundAssetContainerProps {
  canExpand?: boolean;
  noWrap?: boolean;
  assets?: Array<FundAssetType>;
  type: FundAssetViewType;
  size?: number;
  length?: number;
  removable?: boolean;
  lightTheme?: boolean;
  removeHandle?: FundAssetRemoveType;
  remainder?: number;
  hoveringAsset?: string;
  hasPopoverList?: boolean;
}

export type FundAssetType =
  | PlatformAssetFull
  | FundAssetInfo
  | FundAssetPartWithIcon
  | FundAssetPercent;

interface IHidedFundAssetsProps {
  canExpand?: boolean;
  bottomOffset?: boolean;
  length?: number;
  assets: Array<FundAssetType>;
  type: FundAssetViewType;
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
  bottomOffset,
  type,
  removable,
  removeHandle,
  lightTheme,
  assetsLength
}: {
  bottomOffset?: boolean;
  type: FundAssetViewType;
  removable?: boolean;
  lightTheme?: boolean;
  removeHandle?: FundAssetRemoveType;
  hoveringAsset?: string;
  assetsLength: number;
}) => (asset: FundAssetType, idx: number) => (
  <FundAssetTooltipContainer
    bottomOffset={bottomOffset}
    key={idx}
    asset={asset as PlatformAssetFull}
    idx={idx}
    assetsLength={assetsLength}
    type={type}
    removable={removable}
    lightTheme={lightTheme}
    removeHandle={removeHandle}
  />
);

const _FundAssetContainer: React.FC<IFundAssetContainerProps> = ({
  canExpand,
  noWrap,
  assets = [],
  type,
  length,
  remainder = 0,
  size: sizeProp,
  hasPopoverList,
  removable,
  lightTheme,
  removeHandle,
  hoveringAsset
}) => {
  const [size, setSize] = useState<number | undefined>(sizeProp);
  useEffect(() => {
    if (hasPopoverList) setSize(sizeProp);
  });
  return (
    <FundAssets wrap={!noWrap}>
      {assets.filter(getVisibleAssets(size || assets.length)).map(
        renderFundAsset({
          bottomOffset: !noWrap,
          type,
          removable,
          removeHandle,
          lightTheme,
          hoveringAsset,
          assetsLength: assets.length
        })
      )}
      {size && size < (length || assets.length) && (
        <HidedFundAssets
          canExpand={canExpand}
          bottomOffset={!noWrap}
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
        <FundAssetRemainder size={"small"} bottomOffset>
          {remainder} %
        </FundAssetRemainder>
      )}
    </FundAssets>
  );
};

const HidedFundAssets: React.FC<IHidedFundAssetsProps> = React.memo(
  ({
    canExpand,
    bottomOffset,
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
        <RowItem size={"small"} bottomOffset={bottomOffset}>
          <HidedAssetsLabel
            canExpand={canExpand}
            count={(length || assets.length) - size}
            type={type}
            handleOpen={handleOpen}
          />
        </RowItem>
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.TOP}
          anchorEl={anchor}
          noPadding
          onClose={clearAnchor}
        >
          <FundAssetsContainer>
            {assets.filter(getHidedAssets(size)).map(
              renderFundAsset({
                bottomOffset,
                type,
                removable,
                removeHandle,
                hoveringAsset,
                assetsLength: assets.length
              })
            )}
          </FundAssetsContainer>
        </Popover>
      </>
    );
  }
);

const FundAssetContainer = React.memo(_FundAssetContainer);
export default FundAssetContainer;
