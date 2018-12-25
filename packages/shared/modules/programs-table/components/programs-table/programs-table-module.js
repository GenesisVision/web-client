import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import LevelFilter from "../../../../components/table/components/filtering/level-filter/level-filter";
import SelectFilter from "../../../../components/table/components/filtering/select-filter/select-filter";
import { fetchPrograms } from "../../services/programs-table.service";
import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { composeCurrencyFilter } from "./program-table.helpers";
import {
  CURRENCY_FILTER_NAME,
  LEVEL_FILTER_NAME,
  PROGRAMS_COLUMNS,
  PROGRAMS_MODULE_FILTERING,
  PROGRAMS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "./programs.constants";

class ProgramTableModule extends Component {
  fetchPrograms = filters => {
    return fetchPrograms(filters).then(data => ({
      total: data.total,
      items: data.programs
    }));
  };

  toggleFavorite = () => {};

  render() {
    const { t, currencies, isAuthenticated, showRating, title } = this.props;

    return (
      <TableModule
        getItems={this.fetchPrograms}
        defaultFilters={PROGRAMS_TABLE_FILTERS}
        filtering={PROGRAMS_MODULE_FILTERING}
        sorting={SORTING_FILTER_VALUE}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <LevelFilter
              name={LEVEL_FILTER_NAME}
              value={filtering[LEVEL_FILTER_NAME]}
              onChange={updateFilter}
            />
            <SelectFilter
              name={CURRENCY_FILTER_NAME}
              label="Currency"
              value={filtering[CURRENCY_FILTER_NAME]}
              values={composeCurrencyFilter(currencies)}
              onChange={updateFilter}
            />
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={PROGRAMS_COLUMNS}
        renderHeader={column => (
          <ProgramTableHeaderCell
            column={column}
            isAuthenticated={isAuthenticated}
          />
        )}
        renderBodyRow={program => (
          <ProgramTableRow
            showRating={showRating}
            title={title}
            program={program}
            toggleFavorite={this.toggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
}

export default translate()(ProgramTableModule);
