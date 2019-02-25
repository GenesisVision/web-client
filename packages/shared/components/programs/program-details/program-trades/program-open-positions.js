import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import moment from "moment";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "shared/components/programs/program-details/program-details.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { formatValue } from "shared/utils/formatter";

const PAGING = {
  currentPage: 1,
  itemsOnPage: 2000,
  totalPages: 0
};

const DECIMAL_SCALE = 8;

class ProgramOpenPositions extends Component {
  getOpenPositions = filters => {
    const { programId, fetchOpenPositions } = this.props;
    return fetchOpenPositions(programId, filters);
  };

  render() {
    const { t, currency } = this.props;
    return (
      <TableModule
        loader={false}
        getItems={this.getOpenPositions}
        paging={PAGING}
        columns={PROGRAM_OPEN_POSITIONS_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`program-details-page.history.open-positions.${column.name}`)}
          </span>
        )}
        renderBodyRow={position => {
          return (
            <TableRow className="details-trades__row">
              <TableCell className="details-trades__cell program-details-trades__cell--date">
                {moment(position.date).format("DD-MM-YYYY, hh:mm a")}
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--symbol">
                {position.symbol}
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--direction">
                <BaseProfitability
                  isPositive={position.direction === "Buy"}
                  isNegative={position.direction === "Sell"}
                >
                  {position.direction}
                </BaseProfitability>
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--volume">
                <NumberFormat
                  value={formatValue(position.volume, DECIMAL_SCALE / 2)}
                  displayType="text"
                  thousandSeparator=" "
                />
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--price">
                <NumberFormat
                  value={formatValue(position.price, DECIMAL_SCALE)}
                  displayType="text"
                  thousandSeparator=" "
                />
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--priceCurrent">
                <NumberFormat
                  value={formatValue(position.priceCurrent, DECIMAL_SCALE)}
                  displayType="text"
                  thousandSeparator=" "
                />
              </TableCell>
              <TableCell className="details-trades__cell program-details-trades__cell--profit">
                <Profitability value={+position.profit} prefix="sign">
                  <NumberFormat
                    value={formatValue(position.profit, DECIMAL_SCALE, true)}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={` ${currency}`}
                  />
                </Profitability>
              </TableCell>
              {/*<TableCell className="details-trades__cell program-details-trades__cell--profitPercentCurrent">
                <Profitability
                  value={+formatValue(position.profitPercentCurrent)}
                  prefix="sign"
                >
                  <NumberFormat
                    value={formatValue(position.profitPercentCurrent, 2, true)}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={"%"}
                  />
                </Profitability>
              </TableCell>*/}
            </TableRow>
          );
        }}
      />
    );
  }
}

ProgramOpenPositions.propTypes = {
  programId: PropTypes.string.isRequired,
  fetchOpenPositions: PropTypes.func.isRequired
};

export default translate()(ProgramOpenPositions);
