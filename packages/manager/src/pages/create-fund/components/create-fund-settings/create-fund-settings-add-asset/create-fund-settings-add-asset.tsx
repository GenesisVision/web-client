import "../create-fund-settings.scss";

import classNames from "classnames";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import GVTextField from "shared/components/gv-text-field";
import { SearchIcon } from "shared/components/icon/search-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Regulator, {
  TRegulatorHandle
} from "shared/components/regulator/regulator";
import { PlatformAssetFull } from "shared/utils/types";

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
  useEffect(
    () => {
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
    },
    [assets, searchValue]
  );
  return (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={handleCloseDropdown}
    >
      <div className="popover-add">
        <div className="popover-add__search">
          <GVTextField
            name="queryValue"
            wrapperClassName="popover-add__search-input"
            placeholder="Search for assets"
            autoComplete="off"
            adornment={<SearchIcon secondary />}
            adornmentPosition="start"
            onChange={searchHandle}
            value={searchValue}
            // autoFocus
          />
        </div>
        <div className="popover-add__assets">
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
      </div>
    </Popover>
  );
};

const CreateFundSettingsAddAsset = React.memo(_CreateFundSettingsAddAsset);
export default CreateFundSettingsAddAsset;

const AssetLine: React.FC<AssetLineProps> = React.memo(
  ({ remainder, asset, handleDown, handleUp, handlePercentChange }) => (
    <tr className="popover-add__asset">
      <td className="popover-add__asset-icon-container">
        <FundAssetImage
          url={asset.icon}
          alt={asset.asset}
          className="popover-add__asset-icon"
        />
      </td>
      <td className="popover-add__asset-currency-full">{asset.name}</td>
      <td className="popover-add__asset-currency-short">{asset.asset}</td>
      <td className="popover-add__regulator-container">
        <Regulator
          remainder={remainder}
          minValue={asset.mandatoryFundPercent}
          value={asset.percent}
          handleDown={handleDown(asset)}
          handleUp={handleUp(asset)}
        >
          <div className={"popover-add__regulator-indicator"}>
            <input
              value={asset.percent}
              onChange={handlePercentChange(asset)}
              className={classNames("popover-add__regulator-input", {
                "popover-add__regulator-input--mute": asset.percent === 0
              })}
            />
            %
          </div>
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
