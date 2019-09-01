import "shared/components/details/details.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import {
  haveActiveInvestment,
  haveSubscription
} from "shared/components/details/details-description-section/details-investment/investment-container";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  EVENT_LOCATION,
  dispatchProgramDescription,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET, STATUS } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { programEventsSelector } from "shared/reducers/platform-reducer";

import { IDescriptionSection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { programEventsTableSelector } from "./reducers/program-history.reducer";

const _ProgramDetailsContainer: React.FC<Props> = ({
  service: { dispatchProgramDescription },
  redirectToLogin,
  descriptionSection,
  description
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(programEventsTableSelector);
  const eventTypeFilterValues = useSelector(programEventsSelector);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(
    () => {
      isAuthenticated &&
        dispatch(getEvents(description.id, EVENT_LOCATION.Asset)());
    },
    [isAuthenticated]
  );
  useEffect(
    () => {
      isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
    },
    [isAuthenticated, events]
  );
  const isInvested =
    description.personalProgramDetails &&
    description.personalProgramDetails.isInvested;
  const haveInvestment =
    haveActiveInvestment(
      description.personalProgramDetails as InvestmentDetails
    ) ||
    haveSubscription(description.personalProgramDetails as InvestmentDetails);
  const showInvestment = haveEvents || haveInvestment;

  return (
    <Page title={description.title}>
      <div className="details">
        <div className="details__section">
          <ProgramDetailsDescriptionSection
            programDescription={description}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
            ProgramControls={descriptionSection.ProgramControls}
          />
        </div>
        <div className="details__section">
          {showInvestment && (
            <DetailsInvestment
              selector={programEventsTableSelector}
              haveEvents={haveEvents}
              haveInvestment={haveInvestment}
              eventTypeFilterValues={eventTypeFilterValues}
              updateDescription={dispatchProgramDescription}
              notice={t(
                "program-details-page.description.withdraw-notice-text"
              )}
              asset={ASSET.PROGRAM}
              id={description.id}
              assetCurrency={description.currency}
              personalDetails={
                description.personalProgramDetails as InvestmentDetails
              } // TODO fix type InvestmentDetails
              ProgramReinvestingWidget={
                descriptionSection.ProgramReinvestingWidget
              }
              WithdrawContainer={descriptionSection.ProgramWithdrawContainer}
            />
          )}
        </div>
        <div className="details__section">
          <ProgramDetailsStatisticSection
            status={description.status as STATUS}
            id={description.id}
          />
        </div>
        <div className="details__history">
          <ProgramDetailsHistorySection
            showCommissionRebateSometime={
              description.brokerDetails.showCommissionRebateSometime
            }
            isOwnProgram={
              description.personalProgramDetails
                ? description.personalProgramDetails.isOwnProgram
                : false
            }
            showSwaps={description.brokerDetails.showSwaps}
            showTickets={description.brokerDetails.showTickets}
            isSignalProgram={description.isSignalProgram}
            programId={description.id}
            programCurrency={description.currency}
            isInvested={isInvested}
            title={description.title}
          />
        </div>
      </div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  redirectToLogin: () => void;
  descriptionSection: IDescriptionSection;
  description: ProgramDetailsFull;
}

interface Props extends OwnProps, DispatchProps {}

const ProgramDetailsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
