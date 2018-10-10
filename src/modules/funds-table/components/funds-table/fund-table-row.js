import { TableCell, TableRow } from "modules/table/components";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Profitability from "components/profitability/profitability";
import FavoriteIcon from "../../../favorite-asset/components/favorite-icon/favorite-icon";
import ProgramAvatar from "../../../../components/program-avatar/program-avatar";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import AssetContainer from "./asset/asset-container";
import { Link } from "react-router-dom";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "../../../../pages/funds/funds.routes";
import replaceParams from "../../../../utils/replace-params";

class FundsTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
  }

  render() {
    const { fund, isAuthenticated, toggleFavorite } = this.props;
    const fundDetailsUrl = replaceParams(FUND_DETAILS_ROUTE, {
      [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: fund.id
    });
    return (
      <TableRow>
        <TableCell className="funds-table__cell--name">
          <div className="programs-table__cell--avatar-title">
            <ProgramAvatar url={fund.logo} alt={fund.title} />
            <div className="funds-table__cell--title">
              <Link to={fundDetailsUrl}>
                <div className="funds-table__cell--top">{fund.title}</div>
              </Link>
            </div>
          </div>
        </TableCell>
        <TableCell className="funds-table__cell--balance">
          {fund.statistic.balanceGVT.amount} GVT
        </TableCell>
        <TableCell className="funds-table__cell--currency">
          <AssetContainer assets={fund.topFundAssets} />
        </TableCell>
        <TableCell className="funds-table__cell--investors">
          {fund.statistic.investorsCount}
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
          fund.personalProgramDetails && (
            <TableCell className="funds-table__cell--favorite">
              <FavoriteIcon
                toggleSelected={toggleFavorite}
                fundId={fund.id}
                selected={fund.personalProgramDetails.isFavorite}
              />
            </TableCell>
          )}
      </TableRow>
    );
  }
}

export default FundsTableRow;
