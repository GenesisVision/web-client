import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";

import TileFilterPopover from "../tile-filter-popover";

const _FundAssetPopover: React.FC<Props & WithTranslation> = ({
  t,
  values,
  changeFilter
}) => {
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
                <FundAssetImage url={asset.icon} alt={asset.asset} />
                <span className="fund-asset-filter__asset-item-name">
                  {asset.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </TileFilterPopover>
  );
};

const FundAssetPopover = compose<React.ComponentType<Props>>(
  React.memo,
  translate()
)(_FundAssetPopover);
export default FundAssetPopover;

interface Props {
  values: PlatformAsset[];
  changeFilter?(value: string): void;
}
