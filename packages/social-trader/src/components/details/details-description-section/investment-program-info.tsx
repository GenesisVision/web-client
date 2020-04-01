import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Crashable from "decorators/crashable";
import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

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
  id,
  currency,
  title,
  programDetails: {
    availableInvestmentBase,
    availableInvestmentLimit,
    successFeeCurrent,
    successFeeSelected,
    stopOutLevelCurrent,
    stopOutLevelSelected,
    managementFeeCurrent,
    managementFeeSelected
  },
  levelsParameters
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
      {isOwnProgram && (
        <StatisticItemContainerBlock bottomContent>
          <LevelCalculator
            id={id}
            currency={currency}
            title={title}
            levelsParameters={levelsParameters}
            isKycConfirmed={isKycConfirmed || false}
          />
        </StatisticItemContainerBlock>
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
            tooltipContent={t("program-details-page.tooltip.management-fee")}
            labelText={t("program-details-page.description.management-fee")}
          />
        }
        accent
      >
        {managementFeeSelected !== managementFeeCurrent ? (
          <Hint
            content={
              <NumberFormat
                value={formatValue(managementFeeSelected, 2)}
                displayType="text"
                prefix={`${managementFeeCurrent} % (`}
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
            value={formatValue(managementFeeCurrent, 2)}
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
  id: string;
  currency: CurrencyEnum;
  title: string;
  programDetails: ProgramDetailsFull;
  isOwnProgram: boolean;
  levelsParameters: LevelsParamsInfo;
}

const InvestmentProgramInfo = React.memo(Crashable(_InvestmentProgramInfo));
export default InvestmentProgramInfo;
