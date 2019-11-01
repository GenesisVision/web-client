import "shared/components/details/details.scss";

import { ProgramDetailsFullOld } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import DetailsDescriptionSection from "shared/components/details/details-description-section/details-description/details-description-section";
import { DetailsLimitsAvatar } from "shared/components/details/details-description-section/details-description/details-limits-avatar.block";
import { DetailsTags } from "shared/components/details/details-description-section/details-description/details-tags.block";
import PerformanceData from "shared/components/details/details-description-section/details-description/performance-data";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { programEventsSelector } from "shared/reducers/platform-reducer";
import {
  composeProgramNotificationsUrl,
  composeProgramSettingsUrl
} from "shared/utils/compose-url";

import { statisticCurrencyAction } from "./actions/program-details.actions";
import { levelsParamsLoaderData } from "./program-details.loader-data";
import { IDescriptionSection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { levelParametersSelector } from "./reducers/level-parameters.reducer";
import { programEventsTableSelector } from "./reducers/program-history.reducer";
import { dispatchProgramDescription } from "./services/program-details.service";

const _ProgramDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  data: description
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statisticCurrencyAction(description.currency));
  }, [description]);
  const levelsParameters = useSelector(levelParametersSelector);
  const personalDetails = description.personalProgramDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
  const ProgramControls = descriptionSection.ProgramControls;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        personalDetails={description.personalProgramDetails}
        description={description}
        notificationsUrl={composeProgramNotificationsUrl(description.url)}
        settingsUrl={composeProgramSettingsUrl(description.url)}
        AssetDetailsExtraBlock={() => <DetailsTags tags={description.tags} />}
        PerformanceData={() => (
          <PerformanceData
            loaderData={levelsParamsLoaderData}
            data={levelsParameters!}
            programDescription={description}
          />
        )}
        AssetDetailsAvatar={() => (
          <DetailsLimitsAvatar
            logo={description.logo}
            level={description.level}
            levelProgress={description.levelProgress}
            title={description.title}
            color={description.color}
            totalAvailableInvestment={description.totalAvailableInvestment}
            currency={description.currency}
          />
        )}
        Controls={() => (
          <ProgramControls
            loaderData={levelsParamsLoaderData}
            data={levelsParameters!}
            programDescription={description}
            canCloseAsset={personalDetails && personalDetails.canCloseAsset}
            canMakeSignalProvider={
              personalDetails && personalDetails.canMakeSignalProvider
            }
            isOwnProgram={isOwnProgram}
            canInvest={personalDetails && personalDetails.canInvest}
            canWithdraw={personalDetails && personalDetails.canWithdraw}
            isAuthenticated={isAuthenticated}
          />
        )}
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
