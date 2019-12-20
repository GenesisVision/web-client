import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { LevelsParamsInfo } from "gv-api-web";
import {
  ILevelCalculatorProps,
  ProgramDescriptionDataType
} from "pages/programs/program-details/program-details.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { formatCurrencyValue, formatValue } from "utils/formatter";

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

const _InvestmentProgramInfo: React.FC<IInvestmentProgramInfoProps> = ({
  isOwnProgram,
  description: {
    id,
    tradingAccountInfo: { currency },
    publicInfo: { title },
    programDetails: {
      availableInvestmentBase,
      availableInvestmentLimit,
      entryFeeSelected,
      entryFeeCurrent,
      successFeeCurrent,
      successFeeSelected,
      stopOutLevelCurrent,
      stopOutLevelSelected
    }
  },
  levelsParameters,
  LevelCalculator
}) => {
  const [t] = useTranslation();
  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const availableInvestment =
    availableInvestmentLimit < availableInvestmentBase &&
    availableInvestmentLimit !== null
      ? availableInvestmentLimit
      : availableInvestmentBase;
  return (
    <StatisticItemList>
      {LevelCalculator && isOwnProgram && (
        <div className="statistics-item asset-details-description__level-calculator">
          <LevelCalculator
            id={id}
            currency={currency}
            title={title}
            levelsParameters={levelsParameters!}
            isKycConfirmed={isKycConfirmed!}
          />
        </div>
      )}
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.av-to-invest")}
            labelText={t("program-details-page.description.avToInvest")}
          />
        }
        accent
      >
        <NumberFormat
          value={formatCurrencyValue(availableInvestment, currency)}
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
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.success-fee")}
            labelText={t("program-details-page.description.successFee")}
          />
        }
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
        accent
      >
        {renderFee(stopOutLevelSelected, stopOutLevelCurrent)}
      </StatisticItem>
    </StatisticItemList>
  );
};

interface IInvestmentProgramInfoProps {
  isOwnProgram?: boolean;
  description: ProgramDescriptionDataType;
  LevelCalculator?: React.ComponentType<ILevelCalculatorProps>;
  levelsParameters?: LevelsParamsInfo;
  isKycConfirmed?: boolean;
}

const InvestmentProgramInfo = React.memo(_InvestmentProgramInfo);
export default InvestmentProgramInfo;
