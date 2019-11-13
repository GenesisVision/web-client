import { PlatformCurrencyInfo, Timeframe } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import {
  FilteringType,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import { fundListLoaderData } from "shared/modules/funds-table/components/funds-table/fund-table.loader-data";
import { composeCurrencyMap } from "shared/modules/programs-table/components/programs-table/program-table.helpers";
import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";
import { SHOW_IN_CURRENCY_FILTER } from "shared/modules/programs-table/components/programs-table/programs.constants";
import { CurrencyEnum } from "shared/utils/types";

import {
  PROGRAMS_FACET_PAGING,
  PROGRAMS_FACET_TABLE_FILTERS
} from "./follows-facet.constants";

const _ProgramsFacetTable: React.FC<
  IProgramsFacetTableProps & WithTranslation
> = ({
  currency,
  currencies,
  t,
  title,
  sorting,
  getItems,
  isAuthenticated,
  showRating,
  timeframe,
  columns
}) => {
  const toggleFavorite: TableToggleFavoriteType = useCallback(
    (program, updateRow) => () => {
      const { isFavorite } = program.personalDetails;
      const newProgram = {
        ...program,
        personalDetails: { ...program.personalDetails, isFavorite: !isFavorite }
      };
      updateRow(newProgram);
      toggleFavoriteProgram({ id: program.id, isFavorite }).catch(() => {
        updateRow(program);
      });
    },
    []
  );

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
    <ProgramTableModule
      loaderData={fundListLoaderData}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={SHOW_IN_CURRENCY_FILTER}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[SHOW_IN_CURRENCY_FILTER]}
            values={composeCurrencyMap(currencies)}
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
      paging={PROGRAMS_FACET_PAGING}
      sorting={sorting}
      filtering={composeFiltering()}
      defaultFilters={PROGRAMS_FACET_TABLE_FILTERS}
      toggleFavorite={toggleFavorite}
      getItems={getItems}
      isAuthenticated={isAuthenticated}
      showRating={showRating}
      columns={columns}
    />
  );
};

export interface IProgramsFacetTableProps {
  currency?: CurrencyEnum;
  currencies?: PlatformCurrencyInfo[];
  title: string;
  sorting: string;
  timeframe: Timeframe;
  getItems: GetItemsFuncType;
  isAuthenticated?: boolean;
  showRating?: boolean;
  level?: number;
  columns?: SortingColumn[];
}

const FollowsFacetTable = translate()(React.memo(_ProgramsFacetTable));
export default FollowsFacetTable;
