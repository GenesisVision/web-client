import { TableCell, TableRow } from "modules/table/components";
import React, { Component } from "react";
import NumberFormat from "react-number-format";

import FavoriteIcon from "../../../favorite-asset/components/favorite-icon/favorite-icon";

class FundsTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
  }

  render() {
    const { fund, isAuthenticated, toggleFavorite } = this.props;
    return (
      <TableRow>
        <TableCell className="funds-table__cell--name">
          <div className="funds-table__cell--avatar-title">
            <fundAvatar url={fund.logo} alt={fund.title} />
            <div className="funds-table__cell--title">
              <div className="funds-table__cell--top">{fund.title}</div>
            </div>
          </div>
        </TableCell>
        <TableCell className="funds-table__cell--balance">
          {fund.statistic.balanceGVT.amount} GVT
        </TableCell>
        <TableCell className="funds-table__cell--currency">
          {fund.currency}
        </TableCell>
        <TableCell className="funds-table__cell--investors">
          {fund.statistic.investorsCount}
        </TableCell>
        <TableCell className="funds-table__cell--available-to-invest">
          {fund.availableInvestment}
        </TableCell>
        <TableCell className="funds-table__cell--trades">
          {fund.statistic.tradesCount}
        </TableCell>

        <TableCell className="funds-table__cell--drawdown">
          <NumberFormat
            value={fund.statistic.drawdownPercent}
            suffix="%"
            decimalScale={2}
            displayType="text"
          />
        </TableCell>
        <TableCell className="funds-table__cell--profit">
          <NumberFormat
            value={fund.statistic.profitPercent}
            suffix="%"
            decimalScale={2}
            displayType="text"
          />
        </TableCell>
        <TableCell className="funds-table__cell--chart">
          <fundSimpleChart data={fund.chart} />
        </TableCell>
        {isAuthenticated &&
          fund.personalfundDetails && (
            <TableCell className="funds-table__cell--favorite">
              <FavoriteIcon
                toggleSelected={toggleFavorite}
                fundId={fund.id}
                selected={fund.personalfundDetails.isFavorite}
              />
            </TableCell>
          )}
      </TableRow>
    );
  }
}

export default FundsTableRow;
