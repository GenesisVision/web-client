import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  SelectFilterValue,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import TableContainer from "components/table/components/table-container";
import { UpdateFilterFunc } from "components/table/components/table.types";
import { FilterItemInfo } from "gv-api-web";
import FundHistoryRow from "pages/invest/funds/fund-details/fund-details-history-section/fund-history/fund-history-row";
import {
  FUND_HISTORY_COLUMNS,
  HISTORY_EVENT_TYPE_FILTER_NAME
} from "pages/invest/funds/fund-details/fund-details.constants";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import { fundHistoryTableTableSelector } from "pages/invest/funds/fund-details/reducers/fund-history-table.reducer";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundHistoryEventsSelector } from "reducers/platform-reducer";

import { getFundHistoryTable } from "../../services/fund-details.service";

interface Props {
  id: string;
}

export const getEventTypes = (
  types: Array<FilterItemInfo>
): SelectFilterValue<string>[] =>
  types.map(({ key, title }) => ({
    value: key,
    labelKey: title
  }));

const _FundHistory: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();

  const eventTypeFilterValues = useSelector(fundHistoryEventsSelector);
  const eventTypes =
    eventTypeFilterValues !== undefined
      ? getEventTypes(eventTypeFilterValues)
      : [];
  return (
    <TableContainer
      getItems={getFundHistoryTable(id)}
      dataSelector={fundHistoryTableTableSelector}
      isFetchOnMount={true}
      columns={FUND_HISTORY_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <>
          <SelectFilter
            name={HISTORY_EVENT_TYPE_FILTER_NAME}
            label="Type"
            value={filtering[HISTORY_EVENT_TYPE_FILTER_NAME]} //TODO fix filtering types
            values={eventTypes}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.fund-start")}
          />
        </>
      )}
      renderHeader={(column: SortingColumn) => (
        <span>
          {t(`fund-details-page:history.history-table.${column.name}`)}
        </span>
      )}
      renderBodyRow={(item: IFundHistoryDataItem) => (
        <FundHistoryRow item={item} />
      )}
    />
  );
};

const FundHistory = React.memo(_FundHistory);
export default FundHistory;
