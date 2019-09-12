import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { connect, ResolveThunks, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { haveActiveInvestment } from "shared/components/details/details-description-section/details-investment/investment-container";
import Page from "shared/components/page/page";
import {
  EVENT_LOCATION,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { fundEventsSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import { fundEventsTableSelector } from "./reducers/fund-history.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({
  service: { dispatchFundDescription },
  descriptionSection,
  description
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(fundEventsTableSelector);
  const eventTypeFilterValues = useSelector(fundEventsSelector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(
    () => {
      isAuthenticated &&
        dispatch(getEvents(description.id, EVENT_LOCATION.Asset)());
    },
    [description.id, dispatch, isAuthenticated]
  );
  useEffect(
    () => {
      isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
    },
    [isAuthenticated, events]
  );
  const haveInvestment = haveActiveInvestment(
    description.personalFundDetails as InvestmentDetails
  );
  const showInvestment = haveEvents || haveInvestment;

  return (
    <Page title={description.title}>
      <FundDetailsDescriptionSection
        fundDescription={description}
        isAuthenticated={isAuthenticated}
        FundControls={descriptionSection.FundControls}
      />
      <div className="details__divider" />
      {showInvestment && (
        <DetailsInvestment
          selector={fundEventsTableSelector}
          haveEvents={haveEvents}
          haveInvestment={haveInvestment}
          eventTypeFilterValues={eventTypeFilterValues}
          updateDescription={dispatchFundDescription}
          asset={ASSET.FUND}
          id={description.id}
          assetCurrency={"GVT" as CurrencyEnum}
          personalDetails={description.personalFundDetails as InvestmentDetails}
          WithdrawContainer={descriptionSection.FundWithdrawalContainer}
        />
      )}
      <FundDetailsStatisticSection />
      <FundDetailsHistorySection id={description.id} />
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
  descriptionSection: IDescriptionSection;
  description: FundDetailsFull;
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
