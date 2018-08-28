import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import TableCell from "components/table/table-cell";
import TableRow from "components/table/table-row";
import { GVProgramAvatar } from "gv-react-components";
import FavoriteIcon from "modules/favorite-program/components/favorite-icon/favorite-icon";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

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
          errorImage={gvLogo}
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
        {program.period}
      </TableCell>
      <TableCell className="programs-table__cell--drawdown">
        {program.statistic.drawdownPercent}%
      </TableCell>
      <TableCell className="programs-table__cell--profit">
        {program.statistic.profitPercent}%
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
