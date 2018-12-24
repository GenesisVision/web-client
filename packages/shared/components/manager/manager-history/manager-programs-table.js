import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import ProgramTableRow from "shared/modules/programs-table/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "shared/modules/programs-table/components/programs-table/programs.constants";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING
} from "../manager.constants";
import { fetchManagerPrograms } from "../services/manager.service";

class ManagerPrograms extends Component {
  state = {};

  fetchManagerPrograms = filters => {
    const { managerId } = this.props;
    return fetchManagerPrograms({ ...filters, managerId });
  };

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
    const { t, title, isAuthenticated } = this.props;

    return (
      <TableModule
        title={title}
        getItems={this.fetchManagerPrograms}
        defaultFilters={MANAGER_DEFAULT_FILTERS}
        filtering={MANAGER_FILTERING}
        paging={DEFAULT_PAGING}
        columns={PROGRAMS_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        )}
        renderHeader={column => {
          if (!isAuthenticated && column.name === "favorite") return null;
          return (
            <span
              className={`programs-table__cell  programs-table__cell--${
                column.name
              }`}
            >
              {t(`programs-page.programs-header.${column.name}`)}
            </span>
          );
        }}
        renderBodyRow={(program, updateRow) => (
          <ProgramTableRow
            title={title}
            program={program}
            toggleFavorite={this.toggleFavorite(program, updateRow)}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
}

ManagerPrograms.propTypes = {
  managerId: PropTypes.string.isRequired
};

export default translate()(ManagerPrograms);
