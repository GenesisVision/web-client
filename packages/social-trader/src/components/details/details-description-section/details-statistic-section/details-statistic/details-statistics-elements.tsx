import {
  ChartPeriodType,
  TChartPeriod
} from "components/chart/chart-period/chart-period.helpers";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  Current: React.ComponentType;
  Particular: React.ComponentType;
  periodType: TChartPeriod;
}

const ParticularInformation = styled(Row)`
  justify-content: space-between;
  align-items: flex-start;
  align-content: stretch;
`;

const _DetailsStatisticsElements: React.FC<Props> = ({
  Current,
  Particular,
  periodType
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Row onlyOffset>
        <h5>{t("asset-details:statistics.current")}</h5>
        <ParticularInformation wrap>
          <Current />
        </ParticularInformation>
      </Row>
      <Row size={"large"} onlyOffset>
        <h5>
          {t("asset-details:statistics.for")}{" "}
          {t(`asset-details:chart-period.${ChartPeriodType[periodType]}`)}
        </h5>
        <ParticularInformation wrap>
          <Particular />
        </ParticularInformation>
      </Row>
    </>
  );
};

const DetailsStatisticsElements = React.memo(_DetailsStatisticsElements);
export default DetailsStatisticsElements;
