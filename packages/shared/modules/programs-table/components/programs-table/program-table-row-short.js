import classnames from "classnames";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import ProgramTagContainer from "shared/components/tag-program/tag-program-container";
import Tooltip from "shared/components/tooltip/tooltip";
import { STATUS } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";

const TAGS = [
  { name: "Crypto", color: "#F7931A" },
  { name: "Forex", color: "#00A478" },
  { name: "High risk", color: "#EA1D3D" },
  { name: "Low risk", color: "#5094D1" }
];

const ProgramTableRowShort = ({
  t,
  title,
  showRating,
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  const {
    status,
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
  const stopPropagationEvent = event => event.stopPropagation();
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
            onClick={stopPropagationEvent}
          >
            <AssetAvatar
              url={logo}
              level={level}
              alt={program.title}
              color={color}
              tooltip={
                <LevelTooltip level={level} canLevelUp={rating.canLevelUp} />
              }
            />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link
                className="programs-table__cell--link"
                to={{
                  pathname: composeProgramDetailsUrl(url),
                  state: `/ ${title}`
                }}
                onClick={stopPropagationEvent}
              >
                {program.title}
              </Link>
            </div>
            <div className="programs-table__cell--bottom">
              <ProgramTagContainer tags={TAGS} />
            </div>
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
        {periodStarts &&
          ((status !== STATUS.CLOSED && (
            <ProgramPeriodPie start={periodStarts} end={periodEnds} />
          )) ||
            t("program-period.program-closed"))}
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

export default translate()(ProgramTableRowShort);
