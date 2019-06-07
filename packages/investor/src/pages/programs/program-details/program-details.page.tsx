import { PlatformInfo } from "gv-api-web";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw.container";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { createSelector } from "reselect";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import {
  fetchHistoryCounts,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";

import ProgramControls from "./components/program-controls";

const _ProgramDetailsPage: React.FC<StateProps> = ({ events }) => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer,
    ProgramReinvestingWidget: ProgramReinvestingContainer
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents,
    fetchHistoryCounts: fetchHistoryCounts,
    eventTypeFilterValues: events
  };

  return (
    <ProgramDetailsPageCommon
      descriptionSection={descriptionSection}
      historySection={historySection}
    />
  );
};

const eventsSelector = createSelector<
  InvestorRootState,
  IApiState<PlatformInfo>,
  SelectFilterValue<string>[]
>(
  state => state.platformData,
  platformData => {
    if (!platformData.data) return [];
    const {
      programs
    } = platformData.data.enums.program.investorNotificationType;
    const events = programs.map((event: string) => ({
      value: event,
      labelKey: `investor.dashboard-page.portfolio-events.types.${event}`
    }));
    return events;
  }
);

const mapStateToProps = (state: InvestorRootState): StateProps => {
  return {
    events: eventsSelector(state)
  };
};

interface StateProps {
  events: SelectFilterValue<string>[];
}

const ProgramDetailsPage = connect(mapStateToProps)(
  React.memo(_ProgramDetailsPage)
);
export default ProgramDetailsPage;
