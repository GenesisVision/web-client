import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import ProgramTableRow from "../../../modules/programs-table/components/programs-table/program-table-row";
import {
  PROGRAMS_COLUMNS,
  PROGRAMS_TABLE_FILTERS
} from "../../../modules/programs-table/components/programs-table/programs.constants";
import { fetchManagerPrograms } from "../services/manager.service";

class ManagerPrograms extends Component {
  fetchManagerPrograms = filters => {
    const { managerId } = this.props;
    return fetchManagerPrograms({ ...filters, managerId });
  };

  render() {
    const { t, title, isAuthenticated } = this.props;

    return (
      <TableModule
        getItems={this.fetchManagerPrograms}
        filtering={PROGRAMS_TABLE_FILTERS}
        paging={DEFAULT_PAGING}
        columns={PROGRAMS_COLUMNS}
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
        renderBodyRow={program => (
          <ProgramTableRow
            title={title}
            program={program}
            toggleFavorite={() => {}}
            isAuthenticated={isAuthenticated}
            redirectToLogin={() => {}}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

ManagerPrograms.propTypes = {
  managerId: PropTypes.string.isRequired
};

export default compose(
  connect(mapStateToProps),
  translate()
)(ManagerPrograms);
