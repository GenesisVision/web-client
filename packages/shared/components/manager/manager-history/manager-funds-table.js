import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { FUNDS_TABLE_COLUMNS } from "shared/modules/funds-table/components/funds-table/funds-table.constants";

import FundsTableModule from "../../../modules/funds-table/components/funds-table/funds-table-modulle";
import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING
} from "../manager.constants";
import { fetchManagerFunds } from "../services/manager.service";

class ManagerFunds extends Component {
  fetchManagerFunds = filters => {
    const { managerId } = this.props;
    return fetchManagerFunds({ ...filters, managerId });
  };

  toggleFavorite = (fund, updateRow) => () => {
    const isFavorite = fund.personalDetails.isFavorite;
    const newProgram = {
      ...fund,
      personalDetails: { ...fund.personalDetails, isFavorite: !isFavorite }
    };
    updateRow(newProgram);
    toggleFavoriteFund(fund.id, isFavorite).catch(() => {
      updateRow(fund);
    });
  };

  render() {
    const { t, title, isAuthenticated } = this.props;
    return (
      <FundsTableModule
        disableTitle
        title={title}
        getItems={this.fetchManagerFunds}
        defaultFilters={MANAGER_DEFAULT_FILTERS}
        filtering={MANAGER_FILTERING}
        paging={DEFAULT_PAGING}
        columns={FUNDS_TABLE_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        )}
        toggleFavorite={this.toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

ManagerFunds.propTypes = {
  managerId: PropTypes.string.isRequired
};

export default translate()(ManagerFunds);
