import { CurrencyItem } from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { PlatformAsset, ProviderPlatformAssets } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import TileFilterPopover from "../tile-filter-popover";
import styles from "./fund-asset-filter.module.scss";

const _FundAssetPopover: React.FC<Props> = ({
  providers,
  values,
  changeFilter
}) => {
  const [t] = useTranslation();
  const filterableValues = values.map(x => ({
    ...x,
    searchValue: x.name + x.asset
  }));
  const tabs = providers.map(({ type }) => type);
  return (
    <TileFilterPopover
      tabCountField={"provider"}
      tabs={tabs}
      header={t("filters.fund-asset.popover-header")}
      placeholder={t("filters.fund-asset.popover-search-placeholder")}
      values={filterableValues}
      changeFilter={changeFilter!}
    >
      {(filteredAssets, handleClick, tab) => {
        const items = filteredAssets.filter(({ provider }) => provider === tab);
        return (
          <Row onlyOffset className={styles["fund-asset-filter__assets-block"]}>
            {items.map((asset, idx) => (
              <Row
                size={"small"}
                className={styles["fund-asset-filter__asset-item"]}
                key={idx}
                onClick={() => handleClick(asset.asset)}
              >
                <RowItem>
                  <CurrencyItem
                    url={asset.url}
                    logo={asset.logoUrl}
                    name={asset.name}
                    small
                  />
                </RowItem>
                <Text muted>{asset.asset}</Text>
              </Row>
            ))}
          </Row>
        );
      }}
    </TileFilterPopover>
  );
};

const FundAssetPopover = React.memo(_FundAssetPopover);
export default FundAssetPopover;

interface Props {
  providers: Array<ProviderPlatformAssets>;
  values: PlatformAsset[];
  changeFilter?(value: string): void;
}
