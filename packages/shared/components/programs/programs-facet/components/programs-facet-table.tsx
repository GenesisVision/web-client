import { ProgramFacetTimeframeEnum } from "gv-api-web";
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
import {
  GetItemsFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

import {
  PROGRAMS_FACET_PAGING,
  PROGRAMS_FACET_TABLE_FILTERS
} from "./programs-facet.constants";

const _ProgramsFacetTable: React.FC<
  IProgramsFacetTableProps & WithTranslation
> = ({
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
      renderFilters={(
        updateFilter,
        filtering: FilteringType //TODO fix filtering types
      ) => (
        <>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
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
  title: string;
  sorting: string;
  timeframe: ProgramFacetTimeframeEnum;
  getItems: GetItemsFuncType;
  isAuthenticated?: boolean;
  showRating?: boolean;
  level?: number;
  columns?: SortingColumn[];
}

const ProgramsFacetTable = translate()(React.memo(_ProgramsFacetTable));
export default ProgramsFacetTable;
