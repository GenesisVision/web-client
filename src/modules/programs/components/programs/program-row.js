import FavoriteIcon from "components/favorite-icon/favorite-icon";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

import ProgramStatistic from "./program-statistic";

const ProgramRow = ({ program, onExpandClick }) => {
  return (
    <div className="program" onClick={onExpandClick}>
      <GVProgramAvatar
        url={fileService.getFileUrl(program.avatar)}
        level={program.level}
        alt={program.title}
        errorImage={gvLogo}
      />
      <div className="program__title">{program.title}</div>
      <ProgramStatistic program={program} />
      <div className="program__statistic program__chart">
        <ProgramSimpleChart data={program.chart} />
      </div>
      <FavoriteIcon toggleSelected={() => {}} selected />
    </div>
  );
};

export default ProgramRow;
