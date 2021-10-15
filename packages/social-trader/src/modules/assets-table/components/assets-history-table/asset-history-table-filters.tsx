import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { CoinsAssetFilterContainer } from "components/table/components/filtering/fund-asset-filter/coins-asset-filter.container";
import { FUND_ASSET_FILTER_NAME } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";
import { UpdateFilterFunc } from "components/table/components/table.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  updateFilter: UpdateFilterFunc;
  filtering: FilteringType;
}

const _AssetHistoryTableFilters: React.FC<Props> = ({
  updateFilter,
  filtering
}) => {
  const [t] = useTranslation();
  return (
    <>
      <DateRangeFilter
        name={DATE_RANGE_FILTER_NAME}
        value={filtering[DATE_RANGE_FILTER_NAME]}
        onChange={updateFilter}
        startLabel={t("filters.date-range.asset-start")}
      />
      <CoinsAssetFilterContainer
        name={FUND_ASSET_FILTER_NAME}
        value={filtering[FUND_ASSET_FILTER_NAME] as string[]}
        onChange={updateFilter}
      />
    </>
  );
};

const AssetHistoryTableFilters = React.memo(_AssetHistoryTableFilters);
export default AssetHistoryTableFilters;
