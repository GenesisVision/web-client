import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

interface IInvestmentProgramInfoProps {
  isOwnProgram?: boolean;
  programDescription: ProgramDetailsFull;
}

const renderFee = (
  valueSelected: number,
  valueCurrent: number
): JSX.Element => {
  return valueSelected !== valueCurrent ? (
    <NumberFormat
      value={formatValue(valueSelected, 2)}
      displayType="text"
      prefix={`${valueCurrent} % (`}
      suffix=" %)"
    />
  ) : (
    <NumberFormat
      value={formatValue(valueCurrent, 2)}
      displayType="text"
      suffix=" %"
    />
  );
};

const InvestmentProgramInfo: React.FC<
  InjectedTranslateProps & IInvestmentProgramInfoProps
> = ({ t, programDescription, isOwnProgram }) => {
  const {
    availableInvestmentBase,
    currency,
    entryFeeSelected,
    entryFeeCurrent,
    successFeeCurrent,
    successFeeSelected,
    stopOutLevelCurrent,
    stopOutLevelSelected
  } = programDescription;
  return (
    <>
      <div className="program-details-description__statistic-container">
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page.tooltip.av-to-invest")}
              labelText={t("program-details-page.description.avToInvest")}
            />
          }
          className="program-details-description__short-statistic-item"
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(availableInvestmentBase, currency)}
            displayType="text"
            suffix={` ${currency}`}
          />
        </StatisticItem>
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page.tooltip.entry-fee")}
              labelText={t("program-details-page.description.entryFee")}
            />
          }
          className="program-details-description__short-statistic-item"
          accent
        >
          {entryFeeSelected !== entryFeeCurrent ? (
            <Hint
              content={
                <NumberFormat
                  value={formatValue(entryFeeSelected, 2)}
                  displayType="text"
                  prefix={`${entryFeeCurrent} % (`}
                  suffix=" %)"
                />
              }
              className="program-details-description__short-statistic-hint"
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              tooltipContent={t(
                "program-details-page.description.entry-fee-levels"
              )}
            />
          ) : (
            <NumberFormat
              value={formatValue(entryFeeCurrent, 2)}
              displayType="text"
              suffix=" %"
            />
          )}
        </StatisticItem>
      </div>
      <div className="program-details-description__statistic-container">
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page.tooltip.success-fee")}
              labelText={t("program-details-page.description.successFee")}
            />
          }
          className="program-details-description__short-statistic-item"
          accent
        >
          {renderFee(successFeeSelected, successFeeCurrent)}
        </StatisticItem>
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page.tooltip.stop-out-level")}
              labelText={t("program-details-page.description.stop-out-level")}
            />
          }
          condition={!!stopOutLevelCurrent && !!stopOutLevelSelected}
          className="program-details-description__short-statistic-item"
          accent
        >
          {renderFee(stopOutLevelSelected, stopOutLevelCurrent)}
        </StatisticItem>
      </div>
    </>
  );
};

export default translate()(React.memo(InvestmentProgramInfo));
