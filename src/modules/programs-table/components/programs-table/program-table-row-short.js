import ProgramAvatar from "components/program-avatar/program-avatar";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableCell, TableRow } from "modules/table/components";
import React from "react";
import NumberFormat from "react-number-format";

const ProgramTableRowShort = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <TableRow onClick={onExpandClick}>
      <TableCell className="programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <ProgramAvatar
            url={program.logo}
            level={program.level}
            alt={program.title}
          />
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">{program.title}</div>
            <div className="programs-table__cell--bottom">
              High risk &middot; Best Choice
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell--balance">
        {program.statistic.balanceGVT.amount} GVT
      </TableCell>
      <TableCell className="programs-table__cell--currency">
        {program.currency}
      </TableCell>
      <TableCell className="programs-table__cell--investors">
        {program.statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell--available-to-invest">
        {program.availableInvestment}
      </TableCell>
      <TableCell className="programs-table__cell--trades">
        {program.statistic.tradesCount}
      </TableCell>
      <TableCell className="programs-table__cell--period">
        {program.periodStarts && (
          <ProgramPeriodPie
            start={program.periodStarts}
            end={program.periodEnds}
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell--drawdown">
        <NumberFormat
          value={program.statistic.drawdownPercent}
          suffix="%"
          decimalScale={2}
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell--profit">
        <NumberFormat
          value={program.statistic.profitPercent}
          suffix="%"
          decimalScale={2}
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell--chart">
        <ProgramSimpleChart data={program.chart} />
      </TableCell>
      {isAuthenticated &&
        program.personalProgramDetails && (
          <TableCell className="programs-table__cell--favorite">
            <FavoriteIcon
              toggleSelected={toggleFavorite}
              programId={program.id}
              selected={program.personalProgramDetails.isFavorite}
            />
          </TableCell>
        )}
    </TableRow>
  );
};

export default ProgramTableRowShort;
