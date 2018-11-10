import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import Profitability from "shared/components/profitability/profitability";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import { GVButton } from "gv-react-components";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatValue } from "shared/utils/formatter";

import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";

class FundsTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
  }

  render() {
    const { fund, isAuthenticated, toggleFavorite, title } = this.props;
    return (
      <TableRow>
        <TableCell className="funds-table__cell funds-table__cell--name">
          <div className="funds-table__cell--avatar-title">
            <Link
              to={{
                pathname: composeFundsDetailsUrl(fund.url),
                state: `/ ${title}`
              }}
            >
              <AssetAvatar
                url={fund.logo}
                alt={fund.title}
                color={fund.color}
              />
            </Link>
            <div className="funds-table__cell--title">
              <Link
                to={{
                  pathname: composeFundsDetailsUrl(fund.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {fund.title}
                </GVButton>
              </Link>
            </div>
          </div>
        </TableCell>
        <TableCell className="funds-table__cell funds-table__cell--amount">
          <NumberFormat
            value={formatValue(fund.statistic.balanceGVT.amount)}
            suffix=" GVT"
            decimalScale={0}
            displayType="text"
          />
        </TableCell>
        <TableCell className="funds-table__cell">
          <FundAssetContainer
            assets={fund.topFundAssets}
            type={"short"}
            size={3}
            length={fund.totalAssetsCount}
          />
        </TableCell>
        <TableCell className="funds-table__cell funds-table__cell--investors">
          {fund.statistic.investorsCount}
        </TableCell>
        <TableCell className="funds-table__cell funds-table__cell--drawdown">
          <NumberFormat
            value={formatValue(fund.statistic.drawdownPercent, 2)}
            suffix="%"
            displayType="text"
          />
        </TableCell>
        <TableCell className="funds-table__cell funds-table__cell--profit">
          <Profitability value={fund.statistic.profitPercent} prefix="sign">
            <NumberFormat
              value={formatValue(fund.statistic.profitPercent, 2)}
              suffix="%"
              allowNegative={false}
              displayType="text"
            />
          </Profitability>
        </TableCell>
        <TableCell className="funds-table__cell funds-table__cell--chart">
          <ProgramSimpleChart data={fund.chart} programId={fund.id} />
        </TableCell>
        {isAuthenticated && fund.personalDetails && (
          <TableCell className="funds-table__cell funds-table__cell--favorite">
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
