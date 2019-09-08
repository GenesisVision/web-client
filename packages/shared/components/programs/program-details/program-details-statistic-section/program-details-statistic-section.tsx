import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";

import ProgramDetailsChart from "./program-details-chart-section/program-details-chart";
import ProgramDetailsStatistics from "./program-details-statistics/program-details-statistics";

const _ProgramDetailsStatisticSection: React.FC = () => (
  <div className="details-statistic-section">
    <div className="details-statistic-section__statistic">
      <ProgramDetailsStatistics />
    </div>
    <div className="details-statistic-section__chart">
      <ProgramDetailsChart />
    </div>
  </div>
);

const ProgramDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default ProgramDetailsStatisticSection;
