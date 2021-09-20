import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import React, { useCallback } from "react";
import { RootState } from "reducers/root-reducer";
import { useSelector } from "react-redux";
import { ASSETS_HISTORY_TABLE_COLUMNS } from "modules/assets-table/assets.constants";
import AssetsHistoryTableHeaderCell from "modules/assets-table/components/assets-history-table/assets-history-table-header-cell";
import AssetHistoryTableRow from "modules/assets-table/components/assets-history-table/asset-history-table-row";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { useTranslation } from "react-i18next";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FundAssetFilterContainer } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.container";
import { FUND_ASSET_FILTER_NAME } from "components/table/components/filtering/fund-asset-filter/fund-asset-filter.constants";

const _AssetsHistory: React.FC<Props> = ({
  itemSelector,
  getItems,
  dataSelector
}) => {
  const [t] = useTranslation();
  const {
    itemsData: { data }
  } = useSelector(itemSelector);
  console.log('data', data);
  const renderHeader = useCallback(
    column => <AssetsHistoryTableHeaderCell column={column} />,
    []
  );
  const renderBodyRow = useCallback(
    event => <AssetHistoryTableRow event={event} />,
    []
  );

  const renderFilters = useCallback(
    (updateFilter, filtering) => {
      console.log('filtering', filtering);
      return (
      <>
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.asset-start")}
        />
        {/*<FundAssetFilterContainer*/}
        {/*  name={FUND_ASSET_FILTER_NAME}*/}
        {/*  value={filtering[FUND_ASSET_FILTER_NAME] as string[]}*/}
        {/*  values={data}*/}
        {/*  onChange={updateFilter}*/}
        {/*/>*/}
      </>
    )},
    [data]
  );

  return (
    <TableContainer
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      paging={DEFAULT_PAGING}
      columns={ASSETS_HISTORY_TABLE_COLUMNS}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
      renderFilters={renderFilters}
    />
  );
};

interface Props {
  itemSelector: (state: RootState) => { [keys: string]: any };
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
}

const AssetsHistory = React.memo(_AssetsHistory);
export default AssetsHistory;
