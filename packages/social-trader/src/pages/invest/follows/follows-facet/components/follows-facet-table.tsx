import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  FilteringType,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { GetItemsFuncType } from "components/table/components/table.types";
import { PlatformCurrencyInfo, Timeframe } from "gv-api-web";
import { useTranslation } from "i18n";
import FollowsTableModule from "modules/follows-table/components/follows-table-module";
import { fundListLoaderData } from "modules/funds-table/components/funds-table/fund-table.loader-data";
import { composeCurrencyMap } from "modules/programs-table/components/programs-table/program-table.helpers";
import { CURRENCY_MAP_NAME } from "modules/programs-table/components/programs-table/programs.constants";
import React, { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

import {
  PROGRAMS_FACET_PAGING,
  PROGRAMS_FACET_TABLE_FILTERS
} from "./follows-facet.constants";

export interface IProgramsFacetTableProps {
  name: string;
  currency?: CurrencyEnum;
  currencies?: PlatformCurrencyInfo[];
  title?: string;
  sorting: string;
  timeframe: Timeframe;
  getItems: GetItemsFuncType;
  level?: number;
  columns?: SortingColumn[];
}

const _FollowsFacetTable: React.FC<IProgramsFacetTableProps> = ({
  name,
  currencies,
  title,
  sorting,
  getItems,
  timeframe,
  columns
}) => {
  const [t] = useTranslation();

  const composeFiltering = useCallback(
    () =>
      ({
        dateRange: {
          ...DEFAULT_DATE_RANGE_FILTER_VALUE,
          type: mapServerTimeFrameToFilterType(timeframe)
        }
      } as FilteringType),
    [timeframe]
  );

  return (
    <FollowsTableModule
      name={name}
      loaderData={fundListLoaderData}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={CURRENCY_MAP_NAME}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[CURRENCY_MAP_NAME]}
            values={composeCurrencyMap(currencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            label={t("filters.date-range.for")}
            startLabel={t("filters.date-range.follow-start")}
          />
        </>
      )}
      title={title}
      paging={PROGRAMS_FACET_PAGING}
      sorting={sorting}
      filtering={composeFiltering()}
      defaultFilters={PROGRAMS_FACET_TABLE_FILTERS}
      getItems={getItems}
      columns={columns}
    />
  );
};

const FollowsFacetTable = React.memo(_FollowsFacetTable);
export default FollowsFacetTable;
