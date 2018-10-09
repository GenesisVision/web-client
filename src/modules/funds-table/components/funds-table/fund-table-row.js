import { TableCell, TableRow } from "modules/table/components";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Profitability from "components/profitability/profitability";
import FavoriteIcon from "../../../favorite-asset/components/favorite-icon/favorite-icon";
import ProgramAvatar from "../../../../components/program-avatar/program-avatar";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";

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
          <div className="programs-table__cell--avatar-title">
            <ProgramAvatar url={fund.logo} alt={fund.title} />
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
          <Profitability value={fund.statistic.profitPercent} prefix="sign">
            <NumberFormat
              value={fund.statistic.profitPercent}
              suffix="%"
              allowNegative={false}
              decimalScale={2}
              displayType="text"
            />
          </Profitability>
        </TableCell>
        <TableCell className="funds-table__cell--chart">
          <ProgramSimpleChart data={fund.chart} programId={fund.id} />
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
