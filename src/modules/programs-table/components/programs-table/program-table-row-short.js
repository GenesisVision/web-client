import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import { TableCell, TableRow } from "modules/table/components";
import React from "react";
import NumberFormat from "react-number-format";
import fileService from "shared/services/file-service";

const ProgramTableRowShort = ({
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  return (
    <TableRow onClick={onExpandClick}>
      <TableCell className="programs-table__cell--name">
        <div className="programs-table__cell--name--avatar-title">
          <GVProgramAvatar
            url={fileService.getFileUrl(program.avatar)}
            level={program.level}
            alt={program.title}
          />
          <div className="programs-table__cell--name--avatar-title--title">
            <div className="programs-table__cell--name--avatar-title--title--top">
              {program.title}
            </div>
            <div className="programs-table__cell--name--avatar-title--title--bottom">
              High risk &middot; Best Choice
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell--balance">
        {program.statistic.balanceInGVT.amount} GVT
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
