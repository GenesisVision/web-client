import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "components/table/components/table.types";
import { FundDetailsList } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { distanceDate } from "shared/utils/dates";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { formatCurrencyValue, formatValue } from "utils/formatter";

const _FundsTableRow: React.FC<Props> = ({
  fund,
  isAuthenticated,
  toggleFavorite,
  title
}) => (
  <TableRow>
    <TableCell className="funds-table__cell funds-table__cell--name">
      <div className="funds-table__cell--avatar-title">
        <Link
          to={{
            pathname: FUND_DETAILS_FOLDER_ROUTE,
            as: composeFundsDetailsUrl(fund.url),
            state: `/ ${title}`
          }}
        >
          <AssetAvatar url={fund.logo} alt={fund.title} color={fund.color} />
        </Link>
        <div className="funds-table__cell--title">
          <Link
            to={{
              pathname: FUND_DETAILS_FOLDER_ROUTE,
              as: composeFundsDetailsUrl(fund.url),
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
        value={formatCurrencyValue(fund.balance.amount, fund.balance.currency)}
        suffix={` ${fund.balance.currency}`}
        displayType="text"
      />
    </TableCell>
    <TableCell className="funds-table__cell">
      <FundAssetContainer
        assets={fund.topFundAssets}
        type={FUND_ASSET_TYPE.SHORT}
        size={3}
        length={fund.totalAssetsCount}
      />
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--investors">
      {fund.investorsCount}
    </TableCell>
    <TableCell className="programs-table__cell programs-table__cell--age">
      {distanceDate(fund.creationDate)}
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--drawdown">
      <NumberFormat
        value={formatValue(fund.statistic.drawdown, 2)}
        suffix="%"
        displayType="text"
      />
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--profit">
      <Profitability
        value={formatValue(fund.statistic.profit, 2)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatValue(fund.statistic.profit, 2)}
          suffix="%"
          allowNegative={false}
          displayType="text"
        />
      </Profitability>
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--chart">
      {fund.statistic && (
        <ProgramSimpleChart data={fund.statistic.chart} programId={fund.id} />
      )}
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

interface Props {
  fund: FundDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
  title?: JSX.Element | string;
}

const FundsTableRow = React.memo(_FundsTableRow);
export default FundsTableRow;
