import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { formatValue } from "shared/utils/formatter";

interface IInvestmentFundInfoProps {
  fundDescription: FundDetailsFull;
}

const _InvestmentFundInfo: React.FC<IInvestmentFundInfoProps> = ({
  fundDescription
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <StatisticItem
        className={"details-description__short-statistic-item"}
        label={
          <TooltipLabel
            tooltipContent={t("fund-details-page.tooltip.entry-fee")}
            labelText={t("fund-details-page.description.entryFee")}
          />
        }
        accent
      >
        <NumberFormat
          value={formatValue(fundDescription.entryFeeCurrent)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("fund-details-page.tooltip.exit-fee")}
            labelText={t("fund-details-page.description.exitFee")}
          />
        }
        className={"details-description__short-statistic-item"}
        accent
      >
        <NumberFormat
          value={formatValue(fundDescription.exitFeeCurrent)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
    </StatisticItemList>
  );
};

const InvestmentFundInfo = React.memo(_InvestmentFundInfo);
export default InvestmentFundInfo;
