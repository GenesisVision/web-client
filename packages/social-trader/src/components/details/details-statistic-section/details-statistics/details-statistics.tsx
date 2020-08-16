import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DefaultBlock } from "components/default.block/default.block";
import {
  IStatisticData,
  TRenderDetailsStatisticsElements
} from "components/details/details-statistic-section/details-statistics/details-statistics.container";
import { detailsStatisticsStyle } from "components/details/details-statistic-section/details-statistics/details-statistics.style";
import { Row } from "components/row/row";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  period: ChartDefaultPeriod;
  statisticData?: IStatisticData;
  renderDetailsStatisticsElements: TRenderDetailsStatisticsElements;
}

const _DetailsStatistics: React.FC<Props> = ({
  className,
  period,
  statisticData,
  renderDetailsStatisticsElements
}) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock size={"large"} solid className={className}>
      <Row>
        <h3>{t("asset-details:statistics.heading")}</h3>
      </Row>
      <Row onlyOffset>
        {renderDetailsStatisticsElements({
          period,
          statisticData
        })}
      </Row>
    </DefaultBlock>
  );
};

const DetailsStatistics = withStyles<Props>({
  dynamicStyles: detailsStatisticsStyle
})(React.memo(_DetailsStatistics));
export default DetailsStatistics;
