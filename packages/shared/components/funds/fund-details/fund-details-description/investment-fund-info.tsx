import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

interface IInvestmentFundInfoProps {
  fundDescription: FundDetailsFull;
}

const InvestmentFundInfo: React.FC<
  IInvestmentFundInfoProps & InjectedTranslateProps
> = ({ t, fundDescription }) => {
  return (
    <div className="program-details-description__statistic-container">
      <StatisticItem
        label={t("fund-details-page.description.entryFee")}
        className={"details-description__short-statistic-item"}
        accent
      >
        <NumberFormat
          value={formatValue(fundDescription.entryFee)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        label={t("fund-details-page.description.exitFee")}
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

export default React.memo(translate()(InvestmentFundInfo));
