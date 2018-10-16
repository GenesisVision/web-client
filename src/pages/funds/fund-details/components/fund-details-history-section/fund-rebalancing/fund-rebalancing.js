import "./fund-rebalancing.scss";

import { TableCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";

import FundAssetContainer from "../../../../../../modules/funds-table/components/funds-table/fund-asset/fund-asset-container";
import {
  FUND_REBALANCING_COLUMNS,
  FUND_REBALANCING_DEFAULT_FILTERS,
  FUND_REBALANCING_FILTERS
} from "../../../fund-details.constants";
import * as service from "../../../services/fund-details.service";

class FundRebalancing extends Component {
  fetchFundRebalancing = filters => {
    const { fundId } = this.props;
    return service.getFundRebalancing(fundId, filters).then(({ data }) => {
      return { items: data.trades, total: data.total };
    });
  };

  render() {
    const { t, rebalancing } = this.props;
    let data = { rebalancing: null, total: 0 };
    if (rebalancing) {
      data.items = rebalancing.rebalances;
      data.total = rebalancing.total;
    }

    return (
      <TableModule
        title={t("fund-details-page.history.subheading")}
        fetchOnMount={false}
        data={data}
        getItems={this.fetchFundRebalancing}
        defaultFilters={FUND_REBALANCING_DEFAULT_FILTERS}
        filtering={FUND_REBALANCING_FILTERS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.fund-rebalancing-start-label")}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={FUND_REBALANCING_COLUMNS}
        renderHeader={column => (
          <span
            className={`fund-details-rebalancing__head-cell fund-details-rebalancing__cell--${
              column.name
            }`}
          >
            {t(`fund-details-page.history.rebalances.${column.name}`)}
          </span>
        )}
        renderBodyRow={rebalance => (
          <TableRow className="fund-details-rebalancing__row">
            <TableCell className="fund-details-rebalancing__cell fund-details-rebalancing__cell--direction">
              {rebalance.from && moment(rebalance.from).format("D MMM YYYY")}
            </TableCell>
            <TableCell className="fund-details-rebalancing__cell fund-details-rebalancing__cell--direction">
              {rebalance.to && moment(rebalance.to).format("D MMM YYYY")}
            </TableCell>
            <TableCell className="fund-details-rebalancing__cell fund-details-rebalancing__cell--direction">
              <FundAssetContainer
                type={"text"}
                assets={rebalance.parts}
                size={5}
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(FundRebalancing);
