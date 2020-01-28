import { CurrencyItem } from "components/currency-item/currency-item";
import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import TileFilterPopover from "../tile-filter-popover";

const _FundAssetPopover: React.FC<Props> = ({ values, changeFilter }) => {
  const [t] = useTranslation();
  const filterableValues = values.map(x => ({
    ...x,
    searchValue: x.name + x.asset
  }));
  return (
    <TileFilterPopover
      header={t("filters.fund-asset.popover-header")}
      placeholder={t("filters.fund-asset.popover-search-placeholder")}
      values={filterableValues}
      changeFilter={changeFilter!}
    >
      {(filteredAssets, handleClick) => (
        <div className="fund-asset-filter__assets-block">
          <ul className="fund-asset-filter__assets">
            {filteredAssets.map((asset, idx) => (
              <li
                className="fund-asset-filter__asset-item"
                key={idx}
                onClick={() => handleClick(asset.asset)}
              >
                <CurrencyItem
                  url={asset.url}
                  logo={asset.icon}
                  name={asset.name}
                  small
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </TileFilterPopover>
  );
};

const FundAssetPopover = React.memo(_FundAssetPopover);
export default FundAssetPopover;

interface Props {
  values: PlatformAsset[];
  changeFilter?(value: string): void;
}
