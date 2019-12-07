import "components/details/details.scss";

import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { InvestmentBlockDetailsType } from "components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramDetailsFull } from "gv-api-web";
import ProgramWithdrawDialog from "modules/program-withdraw/program-withdraw-dialog";
import ProgramDetailsStatisticSection from "pages/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { programEventsSelector } from "reducers/platform-reducer";
import { ASSET } from "shared/constants/constants";
import {
  createProgramNotificationsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

import InvestmentProgramControls from "./program-controls/investment-program-controls";
import PerformanceData from "./program-details-description/performance-data";
import { levelsParamsLoaderData } from "./program-details.loader-data";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { levelParametersSelector } from "./reducers/level-parameters.reducer";
import {
  financialStatisticTableSelector,
  openPositionsTableSelector,
  periodHistoryTableSelector,
  programEventsTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "./reducers/program-history.reducer";
import {
  dispatchProgramDescriptionWithId,
  getFinancialStatistics,
  getOpenPositions,
  getPeriodHistory,
  getProgramHistoryCounts,
  getSubscriptions,
  getTrades
} from "./service/program-details.service";

const _ProgramDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  const levelsParameters = useSelector(levelParametersSelector);
  const personalDetails = description.personalDetails;
  const isOwnProgram = personalDetails && personalDetails.isOwnAsset;
  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchProgramDescriptionWithId(description.id));
  }, [description.id]);

  const tablesData = {
    financialStatistic: {
      dataSelector: financialStatisticTableSelector,
      getItems: getFinancialStatistics
    },
    openPositions: {
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    periodHistory: {
      dataSelector: periodHistoryTableSelector,
      getItems: getPeriodHistory
    },
    subscriptions: {
      dataSelector: subscriptionsTableSelector,
      getItems: getSubscriptions
    },
    trades: { dataSelector: tradesTableSelector, getItems: getTrades }
  };
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        personalDetails={description.personalDetails}
        description={description}
        notificationsUrl={createProgramNotificationsToUrl(
          description.url,
          description.title
        )}
        settingsUrl={createProgramSettingsToUrl(
          description.url,
          description.title
        )}
        AssetDetailsExtraBlock={() => <DetailsTags tags={description.tags} />}
        PerformanceData={() => (
          <PerformanceData
            loaderData={levelsParamsLoaderData}
            data={levelsParameters!}
            programDescription={description}
          />
        )}
        Controls={() => (
          <InvestmentProgramControls
            programDescription={description}
            canCloseAsset={
              personalDetails &&
              personalDetails.isOwnAsset &&
              personalDetails.ownerActions.canClose
            }
            isOwnProgram={isOwnProgram}
            levelsParameters={levelsParameters!}
          />
        )}
      />
      <div className="details__divider" />
      <DetailsInvestment
        fees={{
          successFee: description.successFeeCurrent,
          successFeePersonal:
            description.personalDetails &&
            description.personalDetails.successFeePersonal,
          successFeeCurrent: description.successFeeCurrent,
          successFeeSelected: description.successFeeSelected,
          entryFee: description.successFeeCurrent,
          entryFeeCurrent: description.entryFeeCurrent,
          entryFeeSelected: description.entryFeeSelected
        }}
        dispatchDescription={handleDispatchDescription}
        eventTypesSelector={programEventsSelector}
        asset={ASSET.PROGRAM}
        selector={programEventsTableSelector}
        id={description.id}
        currency={description.currency}
        personalDetails={
          description.personalDetails as InvestmentBlockDetailsType
        }
      />
      <ProgramDetailsStatisticSection />
      <ProgramDetailsHistorySection
        getHistoryCounts={getProgramHistoryCounts}
        tablesData={tablesData}
        showCommissionRebateSometime={
          description.brokerDetails.showCommissionRebateSometime
        }
        isOwnProgram={
          description.personalDetails
            ? description.personalDetails.isOwnAsset
            : false
        }
        showSwaps={description.brokerDetails.showSwaps}
        showTickets={description.brokerDetails.showTickets}
        programId={description.id}
        programCurrency={description.currency}
        title={description.title}
      />
    </Page>
  );
};

interface Props {
  data: ProgramDetailsFull;
}

const ProgramDetailsContainer = withBlurLoader(
  React.memo(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
