import "shared/components/details/details.scss";

import { FundBalanceChart, FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import Page from "shared/components/page/page";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import {
  fetchFundStructure,
  getFundStatistic
} from "./services/fund-details.service";
import {
  FundDetailsProfitChart,
  FundDetailsStatistic
} from "./services/fund-details.types";

const _FundDetailsContainer: React.FC<Props> = ({
  updateDetails,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description,
  statistic,
  profitChart,
  balanceChart
}) => {
  const fetchHistoryPortfolioEvents = (filters: any) =>
    historySection.fetchPortfolioEvents({
      ...filters,
      assetId: description.id
    });
  const isInvested =
    description.personalFundDetails &&
    description.personalFundDetails.isInvested;
  return (
    <Page title={description.title}>
      <ProgramDetailContext.Provider
        value={{
          updateDetails: updateDetails
        }}
      >
        <div className="details">
          <div className="details__section">
            <FundDetailsDescriptionSection
              fundDescription={description}
              isAuthenticated={isAuthenticated}
              accountCurrency={currency}
              redirectToLogin={redirectToLogin}
              FundControls={descriptionSection.FundControls}
              FundWithdrawContainer={descriptionSection.FundWithdrawalContainer}
            />
          </div>
          <div className="details__section">
            <FundDetailsStatisticSection
              getFundStatistic={getFundStatistic}
              programId={description.id}
              currency={currency}
              statistic={statistic}
              profitChart={profitChart}
              balanceChart={balanceChart}
            />
          </div>
          <div className="details__history">
            <FundDetailsHistorySection
              id={description.id}
              fetchFundStructure={fetchFundStructure}
              fetchPortfolioEvents={fetchHistoryPortfolioEvents}
              fetchHistoryCounts={historySection.fetchHistoryCounts}
              eventTypeFilterValues={historySection.eventTypeFilterValues}
              isInvested={isInvested}
            />
          </div>
        </div>
      </ProgramDetailContext.Provider>
    </Page>
  );
};

interface OwnProps {
  updateDetails: () => void;
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: FundDetailsFull;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChart;
  statistic?: FundDetailsStatistic;
  isAuthenticated: boolean;
  currency: CurrencyEnum;
}

interface Props extends OwnProps {}

const FundDetailsContainer = React.memo(withLoader(_FundDetailsContainer));
export default FundDetailsContainer;
