import { ProgramFacetTimeframeEnum } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { mapServerTimeFrameToFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
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

class _ProgramsFacetTable extends React.PureComponent<
  IProgramsFacetTableProps & InjectedTranslateProps
> {
  toggleFavorite: TableToggleFavoriteType = (program, updateRow) => () => {
    const isFavorite = program.personalDetails.isFavorite;
    const newProgram = {
      ...program,
      personalDetails: { ...program.personalDetails, isFavorite: !isFavorite }
    };
    updateRow(newProgram);
    toggleFavoriteProgram(program.id, isFavorite).catch(() => {
      updateRow(program);
    });
  };

  composeFiltering = () => {
    const type = mapServerTimeFrameToFilterType(this.props.timeframe);
    return {
      dateRange: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type
      }
    } as FilteringType;
  };

  render() {
    const {
      t,
      title,
      sorting,
      getItems,
      isAuthenticated,
      showRating
    } = this.props;
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
        filtering={this.composeFiltering()}
        defaultFilters={PROGRAMS_FACET_TABLE_FILTERS}
        toggleFavorite={this.toggleFavorite}
        getItems={getItems}
        isAuthenticated={isAuthenticated}
        showRating={showRating}
      />
    );
  }
}

export interface IProgramsFacetTableProps {
  title: string;
  sorting: string;
  timeframe: ProgramFacetTimeframeEnum;
  getItems: GetItemsFuncType;
  isAuthenticated: boolean;
  showRating?: boolean;
}

const ProgramsFacetTable = translate()(_ProgramsFacetTable);
export default ProgramsFacetTable;
