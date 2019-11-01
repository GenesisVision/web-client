import { PlatformCurrencyOld, Timeframe } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import FundsTableModule from "shared/modules/funds-table/components/funds-table/funds-table-module";
import { CURRENCY_FILTER_NAME } from "shared/modules/funds-table/components/funds-table/funds-table.constants";
import { CurrencyEnum } from "shared/utils/types";

import {
  FUNDS_FACET_PAGING,
  FUNDS_FACET_TABLE_FILTERS
} from "./funds-facet.constants";

const _FundsFacetTable: React.FC<IFundsFacetTableProps & WithTranslation> = ({
  t,
  title,
  sorting,
  getItems,
  isAuthenticated,
  timeframe,
  currency,
  currencies
}) => {
  const toggleFavorite: TableToggleFavoriteType = useCallback(
    (fund, updateRow) => () => {
      const isFavorite = fund.personalDetails.isFavorite;
      const newProgram = {
        ...fund,
        personalDetails: { ...fund.personalDetails, isFavorite: !isFavorite }
      };
      updateRow(newProgram);
      toggleFavoriteFund(fund.id, isFavorite).catch(() => {
        updateRow(fund);
      });
    },
    []
  );

  const composeFiltering = useCallback(
    () =>
      ({
        currency,
        dateRange: {
          ...DEFAULT_DATE_RANGE_FILTER_VALUE,
          type: mapServerTimeFrameToFilterType(timeframe)
        }
      } as FilteringType),
    [currency, timeframe]
  );

  return (
    <FundsTableModule
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={CURRENCY_FILTER_NAME}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[CURRENCY_FILTER_NAME]}
            values={currencies!.map(x => ({ value: x.name, label: x.name }))}
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
      toggleFavorite={toggleFavorite}
      getItems={getItems}
      isAuthenticated={isAuthenticated}
    />
  );
};

export interface IFundsFacetTableProps {
  title: string;
  sorting: string;
  timeframe: Timeframe;
  getItems: GetItemsFuncType;
  isAuthenticated?: boolean;
  currencies?: PlatformCurrencyOld[];
  currency?: CurrencyEnum;
}

const FundsFacetTable = translate()(React.memo(_FundsFacetTable));
export default FundsFacetTable;
