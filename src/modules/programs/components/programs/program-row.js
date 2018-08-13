import FavoriteIcon from "components/favorite-icon/favorite-icon";
import ProgramSimpleChart from "components/program-simple-chart/program-simple-chart";
import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

import ProgramStatistic from "./program-statistic";

const ProgramRow = ({ program, onExpandClick }) => {
  return (
    <tr className="program" onClick={onExpandClick}>
      <td>
        <GVProgramAvatar
          url={fileService.getFileUrl(program.avatar)}
          level={program.level}
          alt={program.title}
          errorImage={gvLogo}
        />

        {program.title}
      </td>
      <ProgramStatistic program={program} />
      <td className="program__statistic program__chart">
        <ProgramSimpleChart data={program.chart} />
      </td>
      <td>
        <FavoriteIcon toggleSelected={() => {}} selected />
      </td>
    </tr>
  );
};

export default ProgramRow;
