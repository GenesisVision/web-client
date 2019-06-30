import translate from "react-i18next/src/translate";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import { STATUS } from "shared/constants/constants";
import PieContainerSmall from "shared/components/pie-container/pie-container-small";
import * as React from "react";
import { InjectedTranslateProps } from "react-i18next";
import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

const _PerfomanceData: React.FC<Props> = ({
  t,
  programDescription,
  levelsParameters
}) => (
  <div className="program-details-description__perfomance-data">
    <StatisticItem label={t("program-details-page.description.broker")}>
      <img
        className={"program-details-description__broker"}
        src={filesService.getFileUrl(programDescription.brokerDetails.logo)}
      />
    </StatisticItem>
    <StatisticItem label={t("program-details-page.description.leverage")}>
      {programDescription.leverageMin}:{programDescription.leverageMin}
    </StatisticItem>
    {programDescription.periodStarts && (
      <StatisticItem label={t("program-details-page.description.period")}>
        <ProgramPeriodPie
          condition={status !== STATUS.CLOSED}
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
  </div>
);

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  levelsParameters: LevelsParamsInfo;
  programDescription: ProgramDetailsFull;
}

const PerfomanceData = translate()(React.memo(_PerfomanceData));
export default PerfomanceData;
