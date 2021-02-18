import {
  DetailsBroker,
  DetailsPerformanceData
} from "components/details/details-description-section/details-description/details-structure-blocks";
import { LabeledValue } from "components/labeled-value/labeled-value";
import Leverage from "components/leverage/leverage";
import PieContainerSmall from "components/pie-container/pie-container-small";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { RowItem } from "components/row-item/row-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { STATUS } from "constants/constants";
import dayjs from "dayjs";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "utils/dates";
import { CurrencyEnum } from "utils/types";

interface Props {
  isExchange?: boolean;
  leverageMin: number;
  leverageMax: number;
  currency?: CurrencyEnum;
  data: LevelsParamsInfo;
  status: string;
  brokerDetails: BrokerDetails;
  programDetails?: ProgramDetailsFull;
}

const _PerformanceData: React.FC<Props> = ({
  isExchange,
  leverageMin,
  leverageMax,
  currency,
  programDetails,
  brokerDetails,
  status,
  data: levelsParameters
}) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      <RowItem size={"xlarge"} bottomOffset>
        <LabeledValue
          label={
            <TooltipLabel
              tooltipContent={t("asset-details:description.tooltips.broker")}
              labelText={t("asset-details:description.broker")}
            />
          }
        >
          <DetailsBroker
            name={brokerDetails.name}
            logoUrl={brokerDetails.logoUrl}
          />
        </LabeledValue>
      </RowItem>
      {currency && (
        <RowItem size={"xlarge"} bottomOffset>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t(
                  "asset-details:description.tooltips.currency"
                )}
                labelText={t("asset-details:description.currency")}
              />
            }
          >
            {currency}
          </LabeledValue>
        </RowItem>
      )}
      {!isExchange && !!leverageMin && !!leverageMax && (
        <RowItem size={"xlarge"} bottomOffset>
          <LabeledValue
            label={
              <TooltipLabel
                tooltipContent={t(
                  "asset-details:description.tooltips.leverage"
                )}
                labelText={t("asset-details:description.leverage")}
              />
            }
          >
            <Leverage min={leverageMin} max={leverageMax} />
          </LabeledValue>
        </RowItem>
      )}
      {programDetails && (
        <>
          {!isExchange && (
            <RowItem size={"xlarge"} bottomOffset>
              <LabeledValue
                label={
                  <TooltipLabel
                    tooltipContent={t(
                      "asset-details:description.tooltips.period"
                    )}
                    labelText={t("asset-details:description.period")}
                  />
                }
              >
                <ProgramPeriodPie
                  condition={status !== STATUS.CLOSED}
                  loader={t("program-period.program-closed")}
                  start={programDetails.periodStarts}
                  end={programDetails.periodEnds}
                />
              </LabeledValue>
            </RowItem>
          )}
          {programDetails && programDetails.type === "DailyPeriod" && (
            <RowItem size={"xlarge"} bottomOffset>
              <LabeledValue
                label={
                  <TooltipLabel
                    tooltipContent={t(
                      "program-details-page:tooltip.processing"
                    )}
                    labelText={t("asset-details:description.processing.title")}
                  />
                }
              >
                {programDetails.dailyPeriodDetails.isProcessingRealTime
                  ? t("asset-details:description.processing.real-time")
                  : `${localizedDate(
                    programDetails.dailyPeriodDetails.nextProcessingDate
                  )} ${dayjs(
                    programDetails.dailyPeriodDetails.nextProcessingDate
                  ).format("HH:mm")}`}
              </LabeledValue>
            </RowItem>
          )}
          <RowItem size={"xlarge"} bottomOffset>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t("asset-details:description.tooltips.age")}
                  labelText={t("asset-details:description.age")}
                />
              }
            >
              <PieContainerSmall
                end={levelsParameters.programAgeMax}
                value={programDetails.ageDays}
                suffix={"days"}
              />
            </LabeledValue>
          </RowItem>
          <RowItem size={"xlarge"} bottomOffset>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.genesis-ratio"
                  )}
                  labelText={t("asset-details:description.genesis-ratio")}
                />
              }
            >
              <PieContainerSmall
                start={levelsParameters.genesisRatioMin}
                end={levelsParameters.genesisRatioMax}
                value={programDetails.genesisRatio}
              />
            </LabeledValue>
          </RowItem>
          <RowItem size={"xlarge"} bottomOffset>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.investment-scale"
                  )}
                  labelText={t("asset-details:description.investment-scale")}
                />
              }
            >
              <PieContainerSmall
                start={levelsParameters.investmentScaleMin}
                end={levelsParameters.investmentScaleMax}
                value={programDetails.investmentScale}
              />
            </LabeledValue>
          </RowItem>
          <RowItem size={"xlarge"} bottomOffset>
            <LabeledValue
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page:tooltip.volume-scale"
                  )}
                  labelText={t("asset-details:description.volume-scale")}
                />
              }
            >
              <PieContainerSmall
                start={levelsParameters.volumeScaleMin}
                end={levelsParameters.volumeScaleMax}
                value={programDetails.volumeScale}
              />
            </LabeledValue>
          </RowItem>
        </>
      )}
    </DetailsPerformanceData>
  );
};

const PerformanceData = withBlurLoader(React.memo(_PerformanceData));
export default PerformanceData;
