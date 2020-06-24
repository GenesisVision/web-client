import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

const _SignalInfo: React.FC<ISignalProgramInfoProps> = ({
  successFee,
  volumeFee
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <InvestmentItem
        label={
          <TooltipLabel
            tooltipContent={t(
              "program-details-page:tooltip.success-fee-signal"
            )}
            labelText={t("asset-details:description.successFee")}
          />
        }
      >
        <NumberFormat value={successFee} displayType="text" suffix=" %" />
      </InvestmentItem>
      <InvestmentItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page:tooltip.volume-fee")}
            labelText={t("asset-details:description.volume-fee")}
          />
        }
      >
        <NumberFormat value={volumeFee} displayType="text" suffix=" %" />
      </InvestmentItem>
    </StatisticItemList>
  );
};

interface ISignalProgramInfoProps {
  successFee: number;
  volumeFee: number;
}

const SignalInfo = React.memo(_SignalInfo);
export default SignalInfo; // TODO refactor
