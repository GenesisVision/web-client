import FavoriteIcon from "components/favorite-icon/favorite-icon";
import { GVProgramAvatar } from "gv-react-components/dist";
import React from "react";
import gvLogo from "shared/media/logo.svg";
import fileService from "shared/services/file-service";

import ProgramSimpleChart from "../../../../components/program-simple-chart/program-simple-chart";

const Program = ({ program }) => {
  return (
    <div className="program">
      <GVProgramAvatar
        url={fileService.getFileUrl(program.avatar)}
        level={program.level}
        alt={program.title}
        errorImage={gvLogo}
      />
      <div className="program__title">{program.title}</div>
      <div className="program__statistic program__balance">
        {program.statistic.balanceInGVT.amount} GVT
      </div>
      <div className="program__statistic program__currency">
        {program.currency}
      </div>
      <div className="program__statistic program__currency">
        {program.statistic.investorsCount}
      </div>
      <div className="program__statistic program__currency">
        {program.availableForInvestment}
      </div>
      <div className="program__statistic program__currency">
        {program.statistic.tradesCount}
      </div>
      <div className="program__statistic program__currency">
        {program.period}
      </div>
      <div className="program__statistic program__currency">
        {program.statistic.drawdownPercent}%
      </div>
      <div className="program__statistic program__currency">
        {program.statistic.profitPercent}%
      </div>
      <div className="program__statistic program__currency">
        <ProgramSimpleChart data={program.chart} />
      </div>
      <div className="program__statistic program__currency">
        <FavoriteIcon />
      </div>
    </div>
  );
};

export default Program;
