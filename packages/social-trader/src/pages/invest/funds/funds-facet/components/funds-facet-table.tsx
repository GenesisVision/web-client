import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { GetItemsFuncType } from "components/table/components/table.types";
import { PlatformCurrencyInfo, Timeframe } from "gv-api-web";
import FundsTableModule from "modules/funds-table/components/funds-table/funds-table-module";
import { CURRENCY_MAP_NAME } from "modules/funds-table/components/funds-table/funds-table.constants";
import { composeCurrencyMapWithoutBase } from "modules/programs-table/components/programs-table/program-table.helpers";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import {
  FUNDS_FACET_PAGING,
  FUNDS_FACET_TABLE_FILTERS
} from "./funds-facet.constants";

export interface IFundsFacetTableProps {
  name: string;
  initCurrency?: CurrencyEnum;
  title?: string;
  sorting: string;
  timeframe: Timeframe;
  getItems: GetItemsFuncType;
  currencies?: PlatformCurrencyInfo[];
  currency?: CurrencyEnum;
}

const _FundsFacetTable: React.FC<IFundsFacetTableProps> = ({
  name,
  initCurrency,
  title,
  sorting,
  getItems,
  timeframe,
  currency,
  currencies
}) => {
  const [t] = useTranslation();
  const composeFiltering = useCallback(
    () =>
      ({
        [CURRENCY_MAP_NAME]: initCurrency || currency,
        dateRange: {
          ...DEFAULT_DATE_RANGE_FILTER_VALUE,
          type: mapServerTimeFrameToFilterType(timeframe)
        }
      } as FilteringType),
    [currency, timeframe]
  );

  return (
    <FundsTableModule
      name={name}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={CURRENCY_MAP_NAME}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[CURRENCY_MAP_NAME]}
            values={composeCurrencyMapWithoutBase(currencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            label={t("filters.date-range.for")}
            startLabel={t("filters.date-range.fund-start")}
          />
        </>
      )}
      title={title}
      paging={FUNDS_FACET_PAGING}
      sorting={sorting}
      filtering={composeFiltering()}
      defaultFilters={FUNDS_FACET_TABLE_FILTERS}
      getItems={getItems}
    />
  );
};

const FundsFacetTable = React.memo(_FundsFacetTable);
export default FundsFacetTable;
