import FavoriteIcon from "components/favorite-icon/favorite-icon";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

import ProgramStatistic from "./program-statistic";

const ProgramRow = ({ program, onExpandClick }) => {
  return (
    <div className="programs-table__row" onClick={onExpandClick}>
      <div className="programs-table__cell programs-table__cell--title">
        <GVProgramAvatar
          url={fileService.getFileUrl(program.avatar)}
          level={program.level}
          alt={program.title}
          errorImage={gvLogo}
        />

        {program.title}
      </div>
      <ProgramStatistic program={program} />
      <div className="programs-table__cell programs-table__cell--chart">
        <ProgramSimpleChart data={program.chart} />
      </div>
      <div className="programs-table__cell programs-table__cell--favorite">
        <FavoriteIcon toggleSelected={() => {}} selected />
      </div>
    </div>
  );
};

export default ProgramRow;
