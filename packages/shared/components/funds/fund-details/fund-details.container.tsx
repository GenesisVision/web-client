import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { FundDetailContext } from "shared/components/details/helpers/details-context";
import Page from "shared/components/page/page";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import {
  fetchFundReallocateHistory,
  fetchFundStructure,
  getFundStatistic
} from "./services/fund-details.service";
import { FundStatisticResult } from "./services/fund-details.types";

const _FundDetailsContainer: React.FC<Props> = ({
  updateDescription,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description,
  statistic
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
      <FundDetailContext.Provider
        value={{
          updateDescription,
          isKycConfirmed: false
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
              statistic={statistic}
            />
          </div>
          <div className="details__history">
            <FundDetailsHistorySection
              id={description.id}
              fetchFundStructure={fetchFundStructure}
              fetchFundReallocateHistory={fetchFundReallocateHistory}
              fetchPortfolioEvents={fetchHistoryPortfolioEvents}
              fetchHistoryCounts={historySection.fetchHistoryCounts}
              eventTypeFilterValues={historySection.eventTypeFilterValues}
              isInvested={isInvested}
            />
          </div>
        </div>
      </FundDetailContext.Provider>
    </Page>
  );
};

interface OwnProps {
  updateDescription: () => void;
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: FundDetailsFull;
  statistic?: FundStatisticResult;
  isAuthenticated: boolean;
  currency: CurrencyEnum;
}

interface Props extends OwnProps {}

const FundDetailsContainer = React.memo(withLoader(_FundDetailsContainer));
export default FundDetailsContainer;
