import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import { compose } from "redux";

import FundDetailsChart from "./fund-details-chart-section/fund-details-chart";
import FundDetailsStatistics from "./fund-details-statistics/fund-details-statistics";

const _FundDetailsStatisticSection: React.FC<Props> = ({ id }) => {
  return (
    <div className="details-statistic-section">
      <div className="details-statistic-section__statistic">
        <FundDetailsStatistics />
      </div>
      <div className="details-statistic-section__chart">
        <FundDetailsChart id={id} />
      </div>
    </div>
  );
};
interface OwnProps {
  id: string;
}

interface Props extends OwnProps {}

const FundDetailsStatisticSection = compose<React.ComponentType<OwnProps>>(
  React.memo
)(_FundDetailsStatisticSection);
export default FundDetailsStatisticSection;
