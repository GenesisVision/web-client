import { ProgramDetails } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import ProgramTableModule, {
  TableToggleFavorite
} from "shared/modules/programs-table/components/programs-table/programs-table-module";

import {
  PROGRAMS_FACET_PAGING,
  PROGRAMS_FACET_TABLE_FILTERING,
  PROGRAMS_FACET_TABLE_FILTERS,
  PROGRAMS_FACET_TABLE_SORTING
} from "./programs-facet.constants";

interface IProgramsFacetTableProps {
  title: string;
  getItems(): void;
  isAuthenticated: boolean;
  showRating: boolean;
}

class ProgramsFacetTable extends React.Component<
  IProgramsFacetTableProps & InjectedTranslateProps
> {
  toggleFavorite: TableToggleFavorite = (
    program: ProgramDetails,
    updateRow
  ) => () => {
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

  render() {
    const { t, title, ...others } = this.props;
    return (
      <ProgramTableModule
        renderFilters={(
          updateFilter,
          filtering: FilteringType //TODO fix filtering types
        ) => (
          <React.Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </React.Fragment>
        )}
        title={title}
        paging={PROGRAMS_FACET_PAGING}
        sorting={PROGRAMS_FACET_TABLE_SORTING}
        filtering={PROGRAMS_FACET_TABLE_FILTERING}
        defaultFilters={PROGRAMS_FACET_TABLE_FILTERS}
        toggleFavorite={this.toggleFavorite}
        {...others}
      />
    );
  }
}

export default translate()(ProgramsFacetTable);
