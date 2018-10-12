import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import Profitability from "components/profitability/profitability";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { TableCell, TableRow } from "modules/table/components";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "../../../../pages/funds/funds.routes";
import replaceParams from "../../../../utils/replace-params";
import FavoriteIcon from "../../../favorite-asset/components/favorite-icon/favorite-icon";
import AssetContainer from "./asset/asset-container";
import { GVButton } from "gv-react-components";

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
      [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: fund.url
    });
    return (
      <TableRow>
        <TableCell className="funds-table__cell--name">
          <div className="funds-table__cell--avatar-title">
            <AssetAvatar url={fund.logo} alt={fund.title} />
            <div className="funds-table__cell--title">
              <Link to={fundDetailsUrl}>
                <GVButton variant="text" color="secondary">
                  {fund.title}
                </GVButton>
              </Link>
            </div>
          </div>
        </TableCell>
        <TableCell className="funds-table__cell">
          {fund.statistic.balanceGVT.amount} GVT
        </TableCell>
        <TableCell className="funds-table__cell">
          <AssetContainer
            assets={fund.topFundAssets}
            type={"short"}
            size={3}
            length={fund.totalAssetsCount}
          />
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
          fund.personalDetails && (
            <TableCell className="funds-table__cell--favorite">
              <FavoriteIcon
                id={fund.id}
                selected={fund.personalDetails.isFavorite}
                onClick={toggleFavorite}
              />
            </TableCell>
          )}
      </TableRow>
    );
  }
}

export default FundsTableRow;
