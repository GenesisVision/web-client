import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import FundsTableRow from "../../../modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "../../../modules/funds-table/components/funds-table/funds-table.constants";
import { fetchManagerFunds } from "../services/manager.service";

class ManagerFunds extends Component {
  fetchManagerFunds = filters => {
    const { managerId } = this.props;
    return fetchManagerFunds({ ...filters, managerId });
  };

  render() {
    const { t, title, isAuthenticated } = this.props;
    return (
      <TableModule
        getItems={this.fetchManagerFunds}
        paging={DEFAULT_PAGING}
        columns={FUNDS_TABLE_COLUMNS}
        renderHeader={column => {
          if (!isAuthenticated && column.name === "favorite") return null;
          return (
            <span
              className={`funds-table__cell funds-table__cell--${column.name}`}
            >
              {t(`funds-page.funds-header.${column.name}`)}
            </span>
          );
        }}
        renderBodyRow={fund => (
          <FundsTableRow
            title={title}
            fund={fund}
            toggleFavorite={() => {}}
            isAuthenticated={isAuthenticated}
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

ManagerFunds.propTypes = {
  managerId: PropTypes.string.isRequired
};

export default compose(
  connect(mapStateToProps),
  translate()
)(ManagerFunds);
