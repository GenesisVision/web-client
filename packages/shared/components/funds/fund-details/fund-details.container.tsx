import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import React, { useCallback } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import { IHistorySection } from "shared/components/programs/program-details/program-details.types";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { hasActiveInvestment } from "../../details/details-description-section/details-investment/investment-container";
import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import {
  dispatchFundDescription,
  fetchFundStructure,
  getFundReallocateHistory
} from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({
  service,
  isKycConfirmed,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description
}) => {
  const fetchHistoryPortfolioEvents = useCallback(
    (filters: any) =>
      historySection.fetchPortfolioEvents({
        ...filters,
        assetId: description.id
      }),
    [historySection, description]
  );
  const isInvested =
    description.personalFundDetails &&
    description.personalFundDetails.isInvested;
  return (
    <Page title={description.title}>
      <div className="details">
        <div className="details__section">
          <FundDetailsDescriptionSection
            fundDescription={description}
            isAuthenticated={isAuthenticated}
            accountCurrency={currency}
            redirectToLogin={redirectToLogin}
            FundControls={descriptionSection.FundControls}
          />
        </div>
        {hasActiveInvestment(
          description.personalFundDetails as InvestmentDetails
        ) && (
          <div className="details__section">
            <div>
              <DetailsInvestment
                eventTypeFilterValues={historySection.eventTypeFilterValues}
                fetchPortfolioEvents={fetchHistoryPortfolioEvents}
                updateDescription={dispatchFundDescription}
                asset={ASSET.FUND}
                id={description.id}
                assetCurrency={"GVT" as CurrencyEnum}
                accountCurrency={currency}
                personalDetails={
                  description.personalFundDetails as InvestmentDetails
                }
                WithdrawContainer={descriptionSection.FundWithdrawalContainer}
              />
            </div>
          </div>
        )}
        <div className="details__section">
          <FundDetailsStatisticSection />
        </div>
        <div className="details__history">
          <FundDetailsHistorySection
            id={description.id}
            fetchFundStructure={fetchFundStructure}
            getFundReallocateHistory={service.getFundReallocateHistory}
            fetchPortfolioEvents={fetchHistoryPortfolioEvents}
            fetchHistoryCounts={historySection.fetchHistoryCounts}
            eventTypeFilterValues={historySection.eventTypeFilterValues}
            isInvested={isInvested}
          />
        </div>
      </div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchFundDescription,
      getFundReallocateHistory
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
  getFundReallocateHistory: typeof getFundReallocateHistory;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface OwnProps {
  isKycConfirmed: boolean;
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: FundDetailsFull;
  isAuthenticated: boolean;
  currency: CurrencyEnum;
}

interface Props extends OwnProps, DispatchProps {}

const FundDetailsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_FundDetailsContainer);
export default FundDetailsContainer;
