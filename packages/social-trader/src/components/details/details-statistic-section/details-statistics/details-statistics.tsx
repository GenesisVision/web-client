import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { DefaultBlock } from "components/default.block/default.block";
import styles from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.module.scss";
import {
  IStatisticData,
  TRenderDetailsStatisticsElements
} from "components/details/details-statistic-section/details-statistics/details-statistics.container";
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
    <DefaultBlock size={"large"} solid className={styles["details-statistics"]}>
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

const DetailsStatistics = React.memo(_DetailsStatistics);
export default DetailsStatistics;
