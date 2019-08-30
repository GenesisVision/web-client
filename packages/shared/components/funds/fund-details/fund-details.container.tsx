import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { haveActiveInvestment } from "../../details/details-description-section/details-investment/investment-container";
import {
  EVENT_LOCATION,
  getEvents
} from "../../programs/program-details/services/program-details.service";
import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection, IFundHistorySection } from "./fund-details.types";
import { fundEventsTableSelector } from "./reducers/fund-history.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";
import { SelectFilterValue } from "../../table/components/filtering/filter.type";

const _FundDetailsContainer: React.FC<Props> = ({
  service,
  isKycConfirmed,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  eventTypeFilterValues,
  description
}) => {
  const events = useSelector(fundEventsTableSelector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getEvents(description.id, EVENT_LOCATION.Asset)());
  }, []);
  useEffect(
    () => {
      setHaveEvents(events.itemsData.data.total > 0);
    },
    [events]
  );
  const haveInvestment = haveActiveInvestment(
    description.personalFundDetails as InvestmentDetails
  );
  const showInvestment = haveEvents || haveInvestment;

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
        {showInvestment && (
          <div className="details__section">
            <div>
              <DetailsInvestment
                selector={fundEventsTableSelector}
                haveEvents={haveEvents}
                haveInvestment={haveInvestment}
                eventTypeFilterValues={eventTypeFilterValues}
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
          <FundDetailsHistorySection id={description.id} />
        </div>
      </div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchFundDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface OwnProps {
  isKycConfirmed: boolean;
  redirectToLogin: () => void;
  eventTypeFilterValues: SelectFilterValue[];
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
