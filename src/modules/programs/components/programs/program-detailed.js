import FavoriteIcon from "components/favorite-icon/favorite-icon";
import { Icon } from "components/icon/icon";
import Surface from "components/surface/surface";
import { GVProgramAvatar } from "gv-react-components";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

import ProgramStatistic from "./program-statistic";

const ProgramDetailed = ({ program, onCollapseClick }) => {
  return (
    <tr>
      <td colspan="11">
        <Surface className="program-detailed">
          <GVProgramAvatar
            url={fileService.getFileUrl(program.avatar)}
            level={program.level}
            alt={program.title}
            errorImage={gvLogo}
          />
          {program.title}
          <br />
          {program.manager.username}
          <br />
          {program.description}
          chart
          <ProgramStatistic program={program} />
          <Icon
            type="collapse"
            className="program-detailed__collapse"
            onClick={onCollapseClick}
          />
          Invest Details
          <span>
            Add to favorites <FavoriteIcon selected />
          </span>
        </Surface>
      </td>
    </tr>
  );
};

export default ProgramDetailed;
