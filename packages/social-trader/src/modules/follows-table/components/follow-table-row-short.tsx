import classNames from "classnames";
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
import { FollowDetailsListItem } from "gv-api-web";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { ASSET } from "shared/constants/constants";
import { distanceDate } from "shared/utils/dates";
import { composeFollowDetailsUrl } from "utils/compose-url";
import { formatValue } from "utils/formatter";

const _FollowTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  updateRow,
  withDispatch,
  showRating,
  follow
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const {
    logo,
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
    <TableRow
      className={classNames({
        "table__row--pretender": false
      })}
    >
      {showRating && <TableCell>{}</TableCell>}
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link to={linkProps}>
            <AssetAvatarWithName
              url={logo}
              alt={follow.title}
              color={color}
              name={
                <div className="programs-table__cell--title">
                  <Link className="programs-table__cell--link" to={linkProps}>
                    {follow.title}
                  </Link>
                  <TagProgramContainer tags={tags} />
                </div>
              }
            />
          </Link>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--subscribers">
        {subscribersCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--subscribers">
        {distanceDate(creationDate)}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {tradesCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(statistic.drawdown, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
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
        {statistic && statistic.chart && (
          <ProgramSimpleChart data={statistic.chart} programId={id} />
        )}
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className="programs-table__cell programs-table__cell--favorite">
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
  showRating?: boolean;
  follow: FollowDetailsListItem;
}

const FollowTableRowShort = React.memo(_FollowTableRowShort);
export default FollowTableRowShort;
