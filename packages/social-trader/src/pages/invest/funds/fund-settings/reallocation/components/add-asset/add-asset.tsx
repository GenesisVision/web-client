import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import GVTextField from "components/gv-text-field";
import { SearchIcon } from "components/icon/search-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { PopoverContent } from "components/popover/popover-content";
import { TRegulatorHandle } from "components/regulator/regulator";
import { RowItem } from "components/row-item/row-item";
import { ProviderPlatformAssets } from "gv-api-web";
import useTab from "hooks/tab.hook";
import AddAssetList, {
  TRegulatorInputHandle
} from "pages/invest/funds/fund-settings/reallocation/components/add-asset/add-asset-list";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { PlatformAssetFull } from "utils/types";

import styles from "./add-asset.module.scss";

interface Props {
  providers: ProviderPlatformAssets[];
  remainder: number;
  anchor?: EventTarget;
  assets: PlatformAssetFull[];
  handleCloseDropdown(): void;
  handleDown: TRegulatorHandle;
  handleUp: TRegulatorHandle;
  handlePercentChange: TRegulatorInputHandle;
}

const _AddAsset: React.FC<Props> = ({
  providers,
  remainder,
  assets,
  anchor,
  handleCloseDropdown,
  handleDown,
  handleUp,
  handlePercentChange
}) => {
  const tradingAssetObject = providers.reduce((prev, curr) => {
    return { ...prev, [curr.type]: curr };
  }, {}) as { [keys: string]: ProviderPlatformAssets };
  const tabs = Object.keys(tradingAssetObject);

  const { tab, setTab } = useTab<any>(tabs[0]);
  const [filteredAssets, setFilteredAssets] = useState<PlatformAssetFull[]>(
    assets
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );
  useEffect(() => {
    const newList = assets.filter(item =>
      searchValue
        ? ~(item.name + item.asset)
            .toUpperCase()
            .indexOf(searchValue.toUpperCase())
        : true
    );
    setFilteredAssets(newList);
  }, [tab, assets, searchValue, anchor]);

  const renderList = filteredAssets.filter(({ provider }) => provider === tab);

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
          <div className={styles["add-fund-asset-popover__title-block"]}>
            <RowItem>
              <GVTabs onChange={setTab} value={tab}>
                {tabs.map(tab => {
                  const count = filteredAssets.filter(
                    ({ provider }) => provider === tab
                  ).length;
                  return <GVTab count={count} value={tab} label={tab} />;
                })}
              </GVTabs>
            </RowItem>
            <RowItem>
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
            </RowItem>
          </div>
          <div className={styles["add-fund-asset-popover__assets"]}>
            <AddAssetList
              remainder={remainder}
              assets={renderList}
              onDown={handleDown}
              onUp={handleUp}
              onPercentChange={handlePercentChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

const AddAsset = React.memo(_AddAsset);
export default AddAsset;
