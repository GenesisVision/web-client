import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

import {
  PROGRAMS_FACET_PAGING,
  PROGRAMS_FACET_TABLE_FILTERING,
  PROGRAMS_FACET_TABLE_FILTERS,
  PROGRAMS_FACET_TABLE_SORTING
} from "./programs-facet.constants";

class ProgramsFacetTable extends Component {
  toggleFavorite = (program, updateRow) => () => {
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
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
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
