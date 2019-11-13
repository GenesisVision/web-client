import "shared/components/details/details.scss";

import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import DetailsDescriptionSection from "shared/components/details/details-description-section/details-description/details-description-section";
import { DetailsLimitsAvatar } from "shared/components/details/details-description-section/details-description/details-limits-avatar.block";
import { DetailsTags } from "shared/components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { FOLLOW_NOTIFICATIONS_FOLDER_ROUTE } from "shared/components/notifications/notifications.routes";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { programEventsSelector } from "shared/reducers/platform-reducer";
import { FOLLOW_SETTINGS_FOLDER_ROUTE } from "shared/routes/invest.routes";
import {
  composeFollowNotificationsUrl,
  composeFollowSettingsUrl
} from "shared/utils/compose-url";

import { statisticCurrencyAction } from "./actions/follow-details.actions";
import PerformanceData from "./follow-details-description/performance-data";
import FollowDetailsStatisticSection from "./follow-details-statistic-section/follow-details-statistic-section";
import {
  FollowDetailsDataType,
  IDescriptionSection
} from "./follow-details.types";
import FollowDetailsHistorySection from "./follow-history-section/follow-details-history-section";
import { followIdSelector } from "./reducers/description.reducer";
import { followEventsTableSelector } from "./reducers/follow-history.reducer";
import { dispatchFollowDescription } from "./services/follow-details.service";

const _FollowDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  data: description
}) => {
  const dispatch = useDispatch();
  const id = useSelector(followIdSelector);
  useEffect(() => {
    dispatch(statisticCurrencyAction(description.currency));
  }, [description]);
  const personalDetails = description.personalProgramDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
  const { Controls } = descriptionSection;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        personalDetails={description.personalProgramDetails}
        description={description}
        notificationsUrl={{
          pathname: FOLLOW_NOTIFICATIONS_FOLDER_ROUTE,
          as: composeFollowNotificationsUrl(description.url),
          state: `/ ${description.title}`
        }}
        settingsUrl={{
          as: composeFollowSettingsUrl(description.url),
          pathname: FOLLOW_SETTINGS_FOLDER_ROUTE,
          state: `/ ${description.title}`
        }}
        AssetDetailsExtraBlock={() => <DetailsTags tags={description.tags} />}
        PerformanceData={() => <PerformanceData description={description} />}
        Controls={() => (
          <Controls
            description={description}
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
        dispatchDescription={dispatchFollowDescription(id)}
        eventTypesSelector={programEventsSelector}
        asset={ASSET.FOLLOW}
        selector={followEventsTableSelector}
        id={description.id}
        currency={description.currency}
        personalDetails={
          description.personalProgramDetails as InvestmentDetails
        }
        WithdrawContainer={descriptionSection.WithdrawContainer}
      />
      <FollowDetailsStatisticSection />
      <FollowDetailsHistorySection
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
        id={description.id}
        programCurrency={description.currency}
      />
    </Page>
  );
};

interface Props {
  descriptionSection: IDescriptionSection;
  data: FollowDetailsDataType;
}

const FollowDetailsContainer = compose<
  React.ComponentType<Props & WithBlurLoaderProps<FollowDetailsDataType>>
>(
  withBlurLoader,
  React.memo
)(_FollowDetailsContainer);
export default FollowDetailsContainer;
