import classNames from "classnames";
import { CopyTradingDetailsList } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "shared/routes/invest.routes";
import { composeFollowDetailsUrl } from "shared/utils/compose-url";
import { distanceDate } from "shared/utils/dates";
import { formatValue } from "shared/utils/formatter";

interface IProgramTableRowShortProps {
  title: string;
  showRating?: boolean;
  follow: CopyTradingDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
}

const _FollowTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  title,
  showRating,
  follow,
  isAuthenticated,
  toggleFavorite
  // onExpandClick
}) => {
  const { t } = useTranslation();
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
    currency,
    color
  } = follow;
  const linkProps = {
    state: `/ ${title}`,
    pathname: FOLLOW_DETAILS_FOLDER_ROUTE,
    as: composeFollowDetailsUrl(url)
  };
  return (
    <TableRow
      className={classNames({
        "table__row--pretender": false
      })}
    >
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link to={linkProps}>
            <AssetAvatar url={logo} alt={follow.title} color={follow.color} />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link className="programs-table__cell--link" to={linkProps}>
                {follow.title}
              </Link>
            </div>
            <div className="programs-table__cell--bottom">
              <TagProgramContainer tags={tags} />
            </div>
          </div>
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
        {statistic && (
          <ProgramSimpleChart data={statistic.chart} programId={id} />
        )}
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className="programs-table__cell programs-table__cell--favorite">
          <FavoriteIcon
            id={id}
            selected={personalDetails.isFavorite}
            onClick={toggleFavorite}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

const FollowTableRowShort = React.memo(_FollowTableRowShort);
export default FollowTableRowShort;
