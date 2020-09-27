import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import Hint from "components/hint/hint";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface IInvestmentProgramInfoProps {
  isExchange?: boolean;
  id: string;
  currency: CurrencyEnum;
  title: string;
  programDetails: ProgramDetailsFull;
  isOwnProgram: boolean;
  levelsParameters: LevelsParamsInfo;
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

const _InvestmentProgramInfo: React.FC<IInvestmentProgramInfoProps> = ({
  isExchange,
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
        <RowItem size={"large"}>
          <LevelCalculator
            id={id}
            currency={currency}
            title={title}
            levelsParameters={levelsParameters}
            isKycConfirmed={isKycConfirmed || false}
          />
        </RowItem>
      )}
      <InvestmentItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page:tooltip.av-to-invest")}
            labelText={t("asset-details:description.avToInvest")}
          />
        }
      >
        <NumberFormat
          value={formatCurrencyValue(availableInvestment, currency)}
          displayType="text"
          suffix={` ${currency}`}
        />
      </InvestmentItem>
      <InvestmentItem
        label={
          <TooltipLabel
            tooltipContent={
              isExchange
                ? t("program-details-page:tooltip.management-fee-exchange")
                : t("program-details-page:tooltip.management-fee")
            }
            labelText={t("asset-details:description.management-fee")}
          />
        }
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
            tooltipContent={t("asset-details:description.entry-fee-levels")}
          />
        ) : (
          <NumberFormat
            value={formatValue(managementFeeCurrent, 2)}
            displayType="text"
            suffix=" % (annual)"
          />
        )}
      </InvestmentItem>
      <InvestmentItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page:tooltip.success-fee")}
            labelText={t("asset-details:description.successFee")}
          />
        }
      >
        {renderFee(successFeeSelected, successFeeCurrent)}
      </InvestmentItem>
      {!isExchange && !!stopOutLevelCurrent && !!stopOutLevelSelected && (
        <InvestmentItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page:tooltip.stop-out-level")}
              labelText={t("asset-details:description.stop-out-level")}
            />
          }
        >
          {renderFee(stopOutLevelSelected, stopOutLevelCurrent)}
        </InvestmentItem>
      )}
    </StatisticItemList>
  );
};

const InvestmentProgramInfo = React.memo(_InvestmentProgramInfo);
export default InvestmentProgramInfo;
