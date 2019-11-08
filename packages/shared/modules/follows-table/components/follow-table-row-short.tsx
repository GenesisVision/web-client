import classNames from "classnames";
import { ProgramDetailsList } from "gv-api-web";
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
  follow: ProgramDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
  onExpandClick(): void;
}

const _FollowTableRowShort: React.FC<IProgramTableRowShortProps> = ({
  title,
  showRating,
  follow,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  const { t } = useTranslation();
  const {
    logo,
    level,
    levelProgress,
    color,
    statistic,
    personalDetails,
    id,
    tags,
    investorsCount
  } = follow;
  const linkProps = {
    state: `/ ${title}`,
    pathname: FOLLOW_DETAILS_FOLDER_ROUTE,
    as: composeFollowDetailsUrl(follow.url)
  };
  return (
    <TableRow
      className={classNames({
        "table__row--pretender": false
      })}
      onClick={onExpandClick}
    >
      {showRating && <TableCell>{}</TableCell>}
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link to={linkProps}>
            <AssetAvatar
              url={logo}
              level={level}
              levelProgress={levelProgress}
              alt={follow.title}
              color={color}
              tooltip={<LevelTooltip level={level} canLevelUp={false} />}
            />
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
        {investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--subscribers">
        Age
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {distanceDate(follow.creationDate)}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        {/*<NumberFormat
          value={formatValue(chart.drawdown, 2)}
          suffix="%"
          displayType="text"
        />*/}
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
