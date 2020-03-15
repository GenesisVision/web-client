import { CurrencyItem } from "components/currency-item/currency-item";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
          {filteredAssets.map((asset, idx) => (
            <Row
              small
              className="fund-asset-filter__asset-item"
              key={idx}
              onClick={() => handleClick(asset.asset)}
            >
              <RowItem>
                <CurrencyItem
                  url={asset.url}
                  logo={asset.icon}
                  name={asset.name}
                  small
                />
              </RowItem>
              <MutedText>{asset.asset}</MutedText>
            </Row>
          ))}
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
