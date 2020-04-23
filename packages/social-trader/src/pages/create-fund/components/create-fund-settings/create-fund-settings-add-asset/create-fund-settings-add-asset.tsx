import classNames from "classnames";
import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
import GVTextField from "components/gv-text-field";
import { SearchIcon } from "components/icon/search-icon";
import { MutedText } from "components/muted-text/muted-text";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import Regulator, { TRegulatorHandle } from "components/regulator/regulator";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { PlatformAssetFull } from "utils/types";

import "./create-fund-settings-add-asset.scss";

const _CreateFundSettingsAddAsset: React.FC<Props> = ({
  remainder,
  assets,
  anchor,
  handleCloseDropdown,
  handleDown,
  handleUp,
  handlePercentChange
}) => {
  const [filteredAssets, setFilteredAssets] = useState<PlatformAssetFull[]>(
    assets
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );
  useEffect(() => {
    setFilteredAssets(
      !!searchValue
        ? assets.filter(
            item =>
              ~(item.name + item.asset)
                .toUpperCase()
                .indexOf(searchValue.toUpperCase())
          )
        : assets
    );
  }, [assets, searchValue]);
  return (
    <>
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={handleCloseDropdown}
      >
        <PopoverContent>
          <div className="add-fund-asset-popover__search">
            <GVTextField
              noMargin
              name="queryValue"
              placeholder="Search for assets"
              autoComplete="off"
              adornment={<SearchIcon secondary />}
              adornmentPosition="start"
              onChange={searchHandle}
              value={searchValue}
            />
          </div>
          <div className="add-fund-asset-popover__assets">
            <table>
              <tbody>
                {filteredAssets.map(asset => (
                  <AssetLine
                    remainder={remainder}
                    asset={asset}
                    handleDown={handleDown}
                    handleUp={handleUp}
                    handlePercentChange={handlePercentChange}
                    key={asset.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

const CreateFundSettingsAddAsset = React.memo(_CreateFundSettingsAddAsset);
export default CreateFundSettingsAddAsset;

const AssetLine: React.FC<AssetLineProps> = React.memo(
  ({ remainder, asset, handleDown, handleUp, handlePercentChange }) => (
    <tr className="add-fund-asset-popover__asset">
      <td>
        <CurrencyItem
          url={asset.url}
          logo={asset.logoUrl}
          small
          name={asset.name}
          symbol={asset.name}
        />
      </td>
      <td>
        <MutedText>{asset.asset}</MutedText>
      </td>
      <td>
        <Regulator
          remainder={remainder}
          minValue={asset.mandatoryFundPercent}
          value={asset.percent}
          handleDown={handleDown(asset)}
          handleUp={handleUp(asset)}
        >
          <Center className="add-fund-asset-popover__regulator-indicator">
            <input
              value={asset.percent}
              onChange={handlePercentChange(asset)}
              className={classNames("add-fund-asset-popover__regulator-input", {
                "add-fund-asset-popover__regulator-input--mute":
                  asset.percent === 0
              })}
            />
            %
          </Center>
        </Regulator>
      </td>
    </tr>
  )
);

interface AssetLineProps {
  remainder: number;
  asset: PlatformAssetFull;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

interface Props {
  remainder: number;
  anchor?: EventTarget;
  assets: PlatformAssetFull[];
  handleCloseDropdown(): void;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

export type TRegulatorInputHandle = (
  asset: PlatformAssetFull
) => React.ChangeEventHandler<HTMLInputElement>;
