import { FundAssetRemoveType } from "components/fund-asset/fund-asset-container";
import {
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import CreateFundSettingsAddAsset, {
  TRegulatorInputHandle
} from "pages/create-fund/components/create-fund-settings/create-fund-settings-add-asset/create-fund-settings-add-asset";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { safeGetElemFromArray } from "utils/helpers";
import { PlatformAssetFull } from "utils/types";

import AssetsComponent from "./assets-block/assets-block";

const _ReallocateField: React.FC<IReallocateFieldProps> = ({
  name,
  value = [],
  assets,
  error,
  touched,
  onChange,
  onBlur
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [stateAssets, setStateAssets] = useState<PlatformAssetFull[]>(
    composeSelectedAssets(value, assets).sort((a, b) => b.percent - a.percent)
  );
  const [newAsset, setNewAsset] = useState<PlatformAssetFull | undefined>(
    undefined
  );
  const [remainder, setRemainder] = useState<number>(getRemainder(stateAssets));

  const submitChanges = useCallback(() => {
    onChange({
      target: {
        value: stateAssets.filter(asset => asset.percent > 0),
        name
      }
    });
  }, [stateAssets, name]);

  useEffect(() => {
    if (!newAsset) return;
    const assets = stateAssets.map(x =>
      x.asset === newAsset.asset ? newAsset : x
    );
    setStateAssets(assets);
    setRemainder(getRemainder(assets));
  }, [newAsset]);
  useEffect(() => {
    if (!anchor && !!newAsset) {
      onBlur &&
        onBlur({
          target: {
            name
          }
        });
      submitChanges();
    }
  }, [anchor, name, newAsset, onBlur, submitChanges]);
  useEffect(() => {
    !anchor &&
      setStateAssets(stateAssets.sort((a, b) => b.percent - a.percent));
  }, [anchor, stateAssets]);

  const handlePercentChange: TRegulatorInputHandle = useCallback(
    (asset): React.ChangeEventHandler<HTMLInputElement> => ({ target }) => {
      const value = +target.value;
      if (isNaN(value)) return;
      const remainderWithoutSelected = getRemainderWithoutSelected(
        asset,
        stateAssets
      );
      setNewAsset({
        ...asset,
        percent: Math.min(remainderWithoutSelected, Math.abs(value))
      });
    },
    [stateAssets]
  );

  const handleDown = useCallback(
    (asset: PlatformAssetFull) => () => {
      if (asset.percent === asset.mandatoryFundPercent) return;
      setNewAsset({ ...asset, percent: asset.percent - 1 });
    },
    []
  );

  const handleUp = useCallback(
    (asset: PlatformAssetFull) => () => {
      if (remainder - 1 < 0) return;
      setNewAsset({ ...asset, percent: asset.percent + 1 });
    },
    [remainder]
  );

  const handleRemove: FundAssetRemoveType = useCallback(
    currency => () => {
      const asset = safeGetElemFromArray(
        stateAssets,
        item => item.asset === currency
      );
      setNewAsset({ ...asset, percent: asset.mandatoryFundPercent });
      submitChanges();
    },
    [stateAssets, submitChanges]
  );

  return (
    <>
      <AssetsComponent
        touched={touched}
        error={error}
        assets={stateAssets.filter(item => item.percent > 0)}
        remainder={remainder}
        removeHandle={handleRemove}
        addHandle={setAnchor}
      />
      <CreateFundSettingsAddAsset
        remainder={remainder}
        anchor={anchor}
        handleCloseDropdown={clearAnchor}
        assets={stateAssets}
        handleDown={handleDown}
        handleUp={handleUp}
        handlePercentChange={handlePercentChange}
      />
    </>
  );
};

const ReallocateField = React.memo(_ReallocateField);
export default ReallocateField;

const MAX_PERCENT = 100;

const getRemainder = (assets: { percent: number }[]) =>
  MAX_PERCENT - assets.reduce((sum, item) => sum + item.percent, 0);

export const composeSelectedAssets = (
  assetsPercents: FundAssetPart[],
  assets: PlatformAsset[]
): PlatformAssetFull[] =>
  assets.map(asset => {
    const targetAsset = assetsPercents.find(x => x.id === asset.id);
    const percent = targetAsset
      ? targetAsset.percent
      : asset.mandatoryFundPercent;
    return { ...asset, percent };
  });

const getRemainderWithoutSelected = (
  asset: FundAssetPartWithIcon,
  assets: PlatformAssetFull[]
) =>
  MAX_PERCENT -
  assets
    .filter(item => item.asset !== asset.asset)
    .reduce((sum, item) => sum + item.percent, 0);

export interface IReallocateFieldProps {
  name: string;
  value: FundAssetPart[];
  assets: PlatformAsset[];
  error?: string;
  touched: boolean;
  onChange(event: {
    target: {
      value: FundAssetPart[];
      name: string;
    };
  }): void;
  onBlur(event: {
    target: {
      name: string;
    };
  }): void;
}

export const mapToPercentWithAsset = ({
  percent,
  asset
}: {
  [key: string]: any;
}): PercentWithAssetType => ({ percent, asset });

export type AssetType =
  | PlatformAsset
  | FundAssetPart
  | FundAssetPartWithIcon
  | PlatformAssetFull;

export type PercentWithAssetType = { percent: number; asset: string };

export const compareAssets = (
  first: Array<AssetType>,
  second: Array<AssetType>
): boolean => {
  const mappedFirst = first.map(mapToPercentWithAsset);
  const mappedSecond = second.map(mapToPercentWithAsset);
  if (
    !mappedFirst ||
    !mappedSecond ||
    mappedFirst.length !== mappedSecond.length
  )
    return false;
  for (const i in mappedFirst) {
    if (
      mappedFirst[i].asset + mappedFirst[i].percent !==
      mappedSecond[i].asset + mappedSecond[i].percent
    )
      return false;
  }
  return true;
};
