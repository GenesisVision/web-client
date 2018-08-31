import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import TableCell from "components/table/table-cell";
import TableRow from "components/table/table-row";
import { GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import React from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";

import ProgramSimpleChart from "../program-simple-chart/program-simple-chart";

const ProgramTableRowShort = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <TableRow className="programs-table__row" onClick={onExpandClick}>
      <TableCell className="programs-table__cell--title">
        <GVProgramAvatar
          url={fileService.getFileUrl(program.avatar)}
          level={program.level}
          alt={program.title}
        />
        {program.title}
      </TableCell>
      <TableCell className="programs-table__cell--balance">
        {program.statistic.balanceInGVT.amount}
      </TableCell>
      <TableCell className="programs-table__cell--currency">
        {program.currency}
      </TableCell>
      <TableCell className="programs-table__cell--investors">
        {program.statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell--available-to-invest">
        {program.availableForInvestment}
      </TableCell>
      <TableCell className="programs-table__cell--trades">
        {program.statistic.tradesCount}
      </TableCell>
      <TableCell className="programs-table__cell--period">
        <ProgramPeriodPie
          start={program.periodDateStart}
          end={program.periodDateEnd}
        />
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
        <ProgramSimpleChart
          data={program.chart}
          isPositive={program.statistic.profitPercent >= 0}
        />
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
