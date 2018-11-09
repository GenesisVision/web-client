import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import Profitability from "shared/components/profitability/profitability";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import Tooltip from "shared/components/tooltip/tooltip";
import { GVButton } from "gv-react-components";
import FavoriteIcon from "modules/favorite-asset/components/favorite-icon/favorite-icon";
import { TableCell, TableRow } from "modules/table/components";
import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { formatValue } from "utils/formatter";

import { composeProgramDetailsUrl } from "../../../../pages/programs/programs.routes";

const ProgramTableRowShort = ({
  title,
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <TableRow onClick={onExpandClick}>
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link
            to={{
              pathname: composeProgramDetailsUrl(program.url),
              state: `/ ${title}`
            }}
          >
            <AssetAvatar
              url={program.logo}
              level={program.level}
              alt={program.title}
              color={program.color}
            />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {program.title}
                </GVButton>
              </Link>
            </div>
            {program.tags && (
              <div className="programs-table__cell--bottom">
                {program.tags.join(` \u00B7 `)}
              </div>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--balance">
        <Tooltip
          render={() => (
            <div>
              {formatValue(program.statistic.balanceBase.amount)}{" "}
              {program.currency}
            </div>
          )}
        >
          <NumberFormat
            value={program.statistic.balanceGVT.amount}
            suffix=" GVT"
            decimalScale={0}
            displayType="text"
          />
        </Tooltip>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--currency">
        {program.currency}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--investors">
        {program.statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--available-to-invest">
        {formatValue(program.availableInvestment)} GVT
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--period">
        {program.periodStarts && (
          <ProgramPeriodPie
            start={program.periodStarts}
            end={program.periodEnds}
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {program.statistic.tradesCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(program.statistic.drawdownPercent, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
        <Profitability value={program.statistic.profitPercent} prefix="sign">
          <NumberFormat
            value={formatValue(program.statistic.profitPercent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        <ProgramSimpleChart data={program.chart} programId={program.id} />
      </TableCell>
      {isAuthenticated &&
        program.personalDetails && (
          <TableCell className="programs-table__cell programs-table__cell--favorite">
            <FavoriteIcon
              id={program.id}
              selected={program.personalDetails.isFavorite}
              onClick={toggleFavorite}
            />
          </TableCell>
        )}
    </TableRow>
  );
};

export default ProgramTableRowShort;
