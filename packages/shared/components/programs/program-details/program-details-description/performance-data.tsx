import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import Leverage from "shared/components/leverage/leverage";
import PieContainerSmall from "shared/components/pie-container/pie-container-small";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import StatisticItemLoader from "shared/components/statistic-item/statistic-item.loader";
import StatisticItemTextLoader from "shared/components/statistic-item/statistic-item.txt-loader";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { STATUS } from "shared/constants/constants";
import {
  WithBlurLoaderProps,
  withBlurLoader
} from "shared/decorators/with-blur-loader";
import filesService from "shared/services/file-service";
import { getRandomInteger } from "shared/utils/helpers";

const _PerformanceData: React.FC<Props> = ({
  programDescription,
  data: levelsParameters
}) => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__performance-data">
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
};

interface Props {
  data: LevelsParamsInfo;
  programDescription: ProgramDetailsFull;
}

export const PerformanceDataLoader: React.FC = () => (
  <div className="asset-details-description__performance-data">
    <StatisticItemLoader />
    <StatisticItemLoader />
    <StatisticItemLoader />
    <StatisticItemLoader />
    <StatisticItemLoader />
    <StatisticItemLoader />
    <StatisticItemLoader />
  </div>
);

export const PerformanceDataTextLoader: React.FC = React.memo(() => {
  const [t] = useTranslation();
  return (
    <div className="asset-details-description__performance-data">
      <StatisticItemTextLoader
        label={t("program-details-page.description.broker")}
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.leverage")}
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.period")}
        value={
          <PieContainerSmall
            end={10}
            value={getRandomInteger(0, 10)}
            suffix={"days"}
          />
        }
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.age")}
        value={
          <PieContainerSmall
            end={10}
            value={getRandomInteger(0, 10)}
            suffix={"days"}
          />
        }
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.genesis-ratio")}
        value={
          <PieContainerSmall
            end={10}
            value={getRandomInteger(0, 10)}
            suffix={"days"}
          />
        }
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.investment-scale")}
        value={
          <PieContainerSmall
            end={10}
            value={getRandomInteger(0, 10)}
            suffix={"days"}
          />
        }
      />
      <StatisticItemTextLoader
        label={t("program-details-page.description.volume-scale")}
        value={
          <PieContainerSmall
            end={10}
            value={getRandomInteger(0, 10)}
            suffix={"days"}
          />
        }
      />
    </div>
  );
});

const PerformanceData = compose<
  React.ComponentType<Props & WithBlurLoaderProps<LevelsParamsInfo>>
>(
  withBlurLoader,
  React.memo
)(_PerformanceData);
export default PerformanceData;
