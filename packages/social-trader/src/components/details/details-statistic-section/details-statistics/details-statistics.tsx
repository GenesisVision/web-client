import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  IStatisticData,
  TRenderDetailsStatisticsElements
} from "components/details/details-statistic-section/details-statistics/details-statistics.container";
import { StyledDetailsStatisticsBlock } from "components/details/details-statistic-section/details-statistics/details-statistics.style";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  period: ChartDefaultPeriod;
  statisticData?: IStatisticData;
  renderDetailsStatisticsElements: TRenderDetailsStatisticsElements;
}

const _DetailsStatistics: React.FC<Props> = ({
  period,
  statisticData,
  renderDetailsStatisticsElements
}) => {
  const [t] = useTranslation();
  return (
    <StyledDetailsStatisticsBlock size={"large"} solid>
      <Row>
        <h3>{t("asset-details:statistics.heading")}</h3>
      </Row>
      <Row onlyOffset>
        {renderDetailsStatisticsElements({
          period,
          statisticData
        })}
      </Row>
    </StyledDetailsStatisticsBlock>
  );
};

const DetailsStatistics = React.memo(_DetailsStatistics);
export default DetailsStatistics;
