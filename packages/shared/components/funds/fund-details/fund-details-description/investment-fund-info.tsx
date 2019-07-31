import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { formatValue } from "shared/utils/formatter";

interface IInvestmentFundInfoProps {
  fundDescription: FundDetailsFull;
}

const InvestmentFundInfo: React.FC<
  IInvestmentFundInfoProps & WithTranslation
> = ({ t, fundDescription }) => {
  return (
    <div className="asset-details-description__statistic-container">
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
          value={formatValue(fundDescription.entryFee)}
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
          value={formatValue(fundDescription.exitFee)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
    </div>
  );
};

export default translate()(React.memo(InvestmentFundInfo));
