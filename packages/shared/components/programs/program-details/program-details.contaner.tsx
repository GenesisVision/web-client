import "shared/components/details/details.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { compose } from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { programEventsSelector } from "shared/reducers/platform-reducer";

import { IDescriptionSection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { programEventsTableSelector } from "./reducers/program-history.reducer";
import { dispatchProgramDescription } from "./services/program-details.service";

const _ProgramDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  description
}) => (
  <Page title={description.title}>
    <ProgramDetailsDescriptionSection
      programDescription={description}
      ProgramControls={descriptionSection.ProgramControls}
    />
    <div className="details__divider" />
    <DetailsInvestment
      dispatchDescription={dispatchProgramDescription}
      eventTypesSelector={programEventsSelector}
      asset={ASSET.PROGRAM}
      selector={programEventsTableSelector}
      id={description.id}
      currency={description.currency}
      personalDetails={description.personalProgramDetails as InvestmentDetails}
      ProgramReinvestingWidget={descriptionSection.ProgramReinvestingWidget}
      WithdrawContainer={descriptionSection.ProgramWithdrawContainer}
    />
    <ProgramDetailsStatisticSection />
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
      title={description.title}
    />
  </Page>
);

interface Props {
  descriptionSection: IDescriptionSection;
  description: ProgramDetailsFull;
}

const ProgramDetailsContainer = compose<
  React.ComponentType<Props & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
