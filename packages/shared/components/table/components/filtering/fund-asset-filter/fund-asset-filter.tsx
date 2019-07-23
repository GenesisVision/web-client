import "./fund-asset-filter.scss";

import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";

import { UpdateFilterFunc } from "../../table.types";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import FundAssetPopover from "./fund-asset-popover";

const _FundAssetFilter: React.FC<Props & WithTranslation> = ({
  t,
  name,
  values,
  value,
  onChange
}) => {
  const selectedAssets = values
    .filter(x => value.includes(x.asset))
    .map(asset => (
      <TileFilterItem key={asset.id} id={asset.asset}>
        <FundAssetImage url={asset.icon} alt={asset.asset} />
        <span className="fund-asset-filter__asset-name">{asset.asset}</span>
      </TileFilterItem>
    ));
  const notSelectedAssets = values.filter(x => !value.includes(x.asset));
  return (
    <TileFilter
      name={name}
      value={value}
      updateFilter={onChange}
      buttonTitle={t("filters.fund-asset.add")}
      selectedTiles={selectedAssets}
    >
      <FundAssetPopover values={notSelectedAssets} />
    </TileFilter>
  );
};

const FundAssetFilter = compose<React.ComponentType<Props>>(
  React.memo,
  translate()
)(_FundAssetFilter);
export default FundAssetFilter;

interface Props {
  name: string;
  value: string[];
  values: PlatformAsset[];
  onChange: UpdateFilterFunc;
}
