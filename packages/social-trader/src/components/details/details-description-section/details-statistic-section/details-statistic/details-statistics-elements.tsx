import "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import {
  ChartPeriodType,
  TChartPeriod
} from "components/chart/chart-period/chart-period.helpers";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _DetailsStatisticsElements: React.FC<Props> = ({
  Current,
  Particular,
  periodType
}) => {
  const [t] = useTranslation();
  return (
    <>
      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.current")}
      </div>
      <div className="details-statistics__particular-information details-statistics__particular-information--current">
        <Current />
      </div>
      <div className="details-statistics__subheading">
        {t("program-details-page.statistics.for")}{" "}
        {t(`chart-period.${ChartPeriodType[periodType]}`)}
      </div>
      <div className="details-statistics__particular-information">
        <Particular />
      </div>
    </>
  );
};

interface Props {
  Current: React.ComponentType;
  Particular: React.ComponentType;
  periodType: TChartPeriod;
}

const DetailsStatisticsElements = React.memo(_DetailsStatisticsElements);
export default DetailsStatisticsElements;
