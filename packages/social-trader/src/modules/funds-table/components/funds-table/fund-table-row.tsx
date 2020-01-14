import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { ASSET } from "constants/constants";
import { FundDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { FUND_DETAILS_FOLDER_ROUTE } from "routes/funds.routes";
import { composeFundsDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

const _FundsTableRow: React.FC<Props> = ({ withDispatch, fund, updateRow }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { linkCreator } = useToLink();
  const link = linkCreator(
    composeFundsDetailsUrl(fund.url),
    FUND_DETAILS_FOLDER_ROUTE
  );
  return (
    <TableRow>
      <TableCell className="funds-table__cell">
        <Link to={link}>
          <AssetAvatarWithName
            url={fund.logo}
            alt={fund.title}
            color={fund.color}
            name={fund.title}
          />
        </Link>
      </TableCell>
      <TableCell className="funds-table__cell funds-table__cell--amount">
        <NumberFormat
          value={formatCurrencyValue(
            fund.balance.amount,
            fund.balance.currency
          )}
          suffix={` ${fund.balance.currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell className="funds-table__cell">
        <FundAssetContainer
          noWrap
          assets={fund.topFundAssets}
          type={FUND_ASSET_TYPE.SHORT}
          size={3}
          length={fund.totalAssetsCount}
        />
      </TableCell>
      <TableCell className="funds-table__cell">{fund.investorsCount}</TableCell>
      <TableCell className="programs-table__cell">
        {distanceDate(fund.creationDate)}
      </TableCell>
      <TableCell className="funds-table__cell">
        <NumberFormat
          value={formatValue(fund.statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="funds-table__cell">
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
        <ProgramSimpleChart data={fund?.statistic?.chart} />
      </TableCell>
      {isAuthenticated && fund.personalDetails && (
        <TableCell className="funds-table__cell">
          <ToggleAssetFavoriteButton
            asset={fund}
            updateRow={updateRow}
            withDispatch={withDispatch}
            assetType={ASSET.FUND}
            id={fund.id}
            isFavorite={fund.personalDetails.isFavorite}
          >
            <FavoriteIcon
              id={fund.id}
              selected={fund.personalDetails.isFavorite}
            />
          </ToggleAssetFavoriteButton>
        </TableCell>
      )}
    </TableRow>
  );
};

interface Props {
  updateRow?: UpdateRowFuncType;
  withDispatch?: boolean;
  fund: FundDetailsListItem;
}

const FundsTableRow = React.memo(_FundsTableRow);
export default FundsTableRow;
