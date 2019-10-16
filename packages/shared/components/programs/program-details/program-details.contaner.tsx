import "shared/components/details/details.scss";

import { ProgramDetailsFullOld } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import DetailsInvestment
  from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection
  from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection
  from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ASSET } from "shared/constants/constants";
import { WithBlurLoaderProps, withBlurLoader } from "shared/decorators/with-blur-loader";
import { programEventsSelector } from "shared/reducers/platform-reducer";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import { IDescriptionSection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { programEventsTableSelector } from "./reducers/program-history.reducer";
import { dispatchProgramDescription } from "./services/program-details.service";

const _ProgramDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  data: description
}) => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(statisticCurrencyAction(description.currency));
    },
    [description]
  );
  return (
    <Page title={description.title}>
      <ProgramDetailsDescriptionSection
        programDescription={description}
        ProgramControls={descriptionSection.ProgramControls}
      />
      <div className="details__divider" />
      <DetailsInvestment
        fees={{
          successFee: description.successFeeCurrent,
          successFeePersonal:
            description.personalProgramDetails &&
            description.personalProgramDetails.successFeePersonal,
          successFeeCurrent: description.successFeeCurrent,
          successFeeSelected: description.successFeeSelected,
          entryFee: description.successFeeCurrent,
          entryFeeCurrent: description.entryFeeCurrent,
          entryFeeSelected: description.entryFeeSelected
        }}
        dispatchDescription={dispatchProgramDescription}
        eventTypesSelector={programEventsSelector}
        asset={ASSET.PROGRAM}
        selector={programEventsTableSelector}
        id={description.id}
        currency={description.currency}
        personalDetails={
          description.personalProgramDetails as InvestmentDetails
        }
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
};

interface Props {
  descriptionSection: IDescriptionSection;
  data: ProgramDetailsFullOld;
}

const ProgramDetailsContainer = compose<
  React.ComponentType<Props & WithBlurLoaderProps<ProgramDetailsFullOld>>
>(
  withBlurLoader,
  React.memo
)(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
