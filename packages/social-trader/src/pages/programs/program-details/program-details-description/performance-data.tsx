import Leverage from "components/leverage/leverage";
import PieContainerSmall from "components/pie-container/pie-container-small";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import filesService from "services/file-service";
import { STATUS } from "shared/constants/constants";

const _PerformanceData: React.FC<Props> = ({
  programDescription,
  data: levelsParameters
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList className="asset-details-description__performance-data">
      <StatisticItem label={t("program-details-page.description.broker")}>
        <img
          className={"asset-details-description__broker"}
          src={filesService.getFileUrl(programDescription.brokerDetails.logo)}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.description.leverage")}>
        <Leverage
          min={programDescription.leverageMin}
          max={programDescription.leverageMax}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.description.currency")}>
        {programDescription.currency}
      </StatisticItem>
      {programDescription.periodStarts && (
        <StatisticItem label={t("program-details-page.description.period")}>
          <ProgramPeriodPie
            condition={programDescription.status !== STATUS.CLOSED}
            loader={t("program-period.program-closed")}
            start={programDescription.periodStarts}
            end={programDescription.periodEnds}
          />
        </StatisticItem>
      )}
      <StatisticItem label={t("program-details-page.description.age")}>
        <PieContainerSmall
          end={levelsParameters.programAgeMax}
          value={programDescription.ageDays}
          suffix={"days"}
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.genesis-ratio")}
            labelText={t("program-details-page.description.genesis-ratio")}
          />
        }
      >
        <PieContainerSmall
          start={levelsParameters.genesisRatioMin}
          end={levelsParameters.genesisRatioMax}
          value={programDescription.genesisRatio}
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.investment-scale")}
            labelText={t("program-details-page.description.investment-scale")}
          />
        }
      >
        <PieContainerSmall
          start={levelsParameters.investmentScaleMin}
          end={levelsParameters.investmentScaleMax}
          value={programDescription.investmentScale}
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.volume-scale")}
            labelText={t("program-details-page.description.volume-scale")}
          />
        }
      >
        <PieContainerSmall
          start={levelsParameters.volumeScaleMin}
          end={levelsParameters.volumeScaleMax}
          value={programDescription.volumeScale}
        />
      </StatisticItem>
    </StatisticItemList>
  );
};

interface Props {
  data: LevelsParamsInfo;
  programDescription: ProgramDetailsFull;
}

const PerformanceData = compose<
  React.ComponentType<Props & WithBlurLoaderProps<LevelsParamsInfo>>
>(
  withBlurLoader,
  React.memo
)(_PerformanceData);
export default PerformanceData;
