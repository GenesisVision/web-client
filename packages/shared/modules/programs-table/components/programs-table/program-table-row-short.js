import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import Tooltip from "shared/components/tooltip/tooltip";
import { GVButton } from "gv-react-components";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatValue } from "shared/utils/formatter";
import classnames from "classnames";

import { composeProgramDetailsUrl } from "shared/utils/compose-url";

const ProgramTableRowShort = ({
  title,
  showRating,
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  const {
    availableInvestment,
    statistic,
    logo,
    level,
    color,
    url,
    currency,
    periodStarts,
    periodEnds,
    chart,
    personalDetails,
    id,
    tags,
    rating
  } = program;
  return (
    <TableRow
      className={classnames({
        "table__row--pretender": rating.canLevelUp
      })}
      onClick={onExpandClick}
    >
      {showRating && <TableCell>{rating.rating}</TableCell>}
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link
            to={{
              pathname: composeProgramDetailsUrl(url),
              state: `/ ${title}`
            }}
          >
            <AssetAvatar
              url={logo}
              level={level}
              alt={program.title}
              color={color}
            />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {program.title}
                </GVButton>
              </Link>
            </div>
            {tags && (
              <div className="programs-table__cell--bottom">
                {tags.join(` \u00B7 `)}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--balance">
        <Tooltip
          render={() => (
            <div>
              {formatValue(statistic.balanceBase.amount)} {currency}
            </div>
          )}
        >
          <NumberFormat
            value={statistic.balanceGVT.amount}
            suffix=" GVT"
            decimalScale={0}
            displayType="text"
          />
        </Tooltip>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--currency">
        {currency}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--investors">
        {statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--available-to-invest">
        {formatValue(availableInvestment)} GVT
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--period">
        {periodStarts && (
          <ProgramPeriodPie start={periodStarts} end={periodEnds} />
        )}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {statistic.tradesCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(statistic.drawdownPercent, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
        <Profitability value={statistic.profitPercent} prefix="sign">
          <NumberFormat
            value={formatValue(statistic.profitPercent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        <ProgramSimpleChart data={chart} programId={id} />
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

export default ProgramTableRowShort;
