import { FundDetails } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import { composeFundsDetailsUrl } from "shared/utils/compose-url";
import { distanceDate } from "shared/utils/dates";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

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
            pathname: composeFundsDetailsUrl(fund.url),
            state: `/ ${title}`
          }}
        >
          <AssetAvatar url={fund.logo} alt={fund.title} color={fund.color} />
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
        value={formatCurrencyValue(
          fund.statistic.balance.amount,
          fund.statistic.balance.currency
        )}
        suffix={` ${fund.statistic.balance.currency}`}
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
      {fund.statistic.investorsCount}
    </TableCell>
    <TableCell className="programs-table__cell programs-table__cell--age">
      {distanceDate(fund.creationDate)}
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--drawdown">
      <NumberFormat
        value={formatValue(fund.statistic.drawdownPercent, 2)}
        suffix="%"
        displayType="text"
      />
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--profit">
      <Profitability
        value={formatValue(fund.statistic.profitPercent, 2)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatValue(fund.statistic.profitPercent, 2)}
          suffix="%"
          allowNegative={false}
          displayType="text"
        />
      </Profitability>
    </TableCell>
    <TableCell className="funds-table__cell funds-table__cell--chart">
      {fund.chart && (
        <ProgramSimpleChart data={fund.chart} programId={fund.id} />
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
  fund: FundDetails;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
  title?: JSX.Element | string;
}

const FundsTableRow = React.memo(_FundsTableRow);
export default FundsTableRow;
