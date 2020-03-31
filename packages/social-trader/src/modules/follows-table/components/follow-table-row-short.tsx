import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateRowFuncType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ASSET } from "constants/constants";
import { FollowDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

const _FollowTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  updateRow,
  withDispatch,
  follow
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const {
    balance,
    logoUrl,
    personalDetails,
    id,
    tags,
    subscribersCount,
    creationDate,
    statistic,
    tradesCount,
    url,
    color
  } = follow;
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  return (
    <TableRow>
      <TableCell className="programs-table__cell">
        <Link to={linkProps}>
          <AssetAvatarWithName
            url={logoUrl}
            alt={follow.title}
            color={color}
            name={
              <div>
                <Link className="programs-table__cell--link" to={linkProps}>
                  {follow.title}
                </Link>
                <TagProgramContainer tags={tags} />
              </div>
            }
          />
        </Link>
      </TableCell>
      <TableCell className="programs-table__cell">
        {balance && (
          <NumberFormat
            value={formatCurrencyValue(balance.amount, balance.currency)}
            suffix={` ${balance.currency}`}
            displayType="text"
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell">{subscribersCount}</TableCell>
      <TableCell className="programs-table__cell">
        {distanceDate(creationDate)}
      </TableCell>
      <TableCell className="programs-table__cell">{tradesCount}</TableCell>
      <TableCell className="programs-table__cell">
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell">
        <Profitability
          value={formatValue(statistic.profit, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profit, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        <ProgramSimpleChart data={statistic?.chart} />
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className="programs-table__cell">
          <ToggleAssetFavoriteButton
            asset={follow}
            updateRow={updateRow}
            withDispatch={withDispatch}
            assetType={ASSET.FOLLOW}
            id={id}
            isFavorite={personalDetails.isFavorite}
          >
            <FavoriteIcon id={id} selected={personalDetails.isFavorite} />
          </ToggleAssetFavoriteButton>
        </TableCell>
      )}
    </TableRow>
  );
};

interface IProgramTableRowShortProps {
  updateRow?: UpdateRowFuncType;
  withDispatch?: boolean;
  follow: FollowDetailsListItem;
}

const FollowTableRowShort = React.memo(_FollowTableRowShort);
export default FollowTableRowShort;
