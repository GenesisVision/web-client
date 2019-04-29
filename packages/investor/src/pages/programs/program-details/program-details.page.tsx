import { ManagerRootState } from "manager-web-portal/src/reducers";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import {
  fetchHistoryCounts,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";

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

const mapStateToProps = (state: ManagerRootState): StateProps => {
  if (!state.platformData.data) return { events: [] };
  const {
    programs
  } = state.platformData.data.enums.program.investorNotificationType;
  const events = programs.map((event: string) => ({
    value: event,
    labelKey: `investor.dashboard-page.portfolio-events.types.${event}`
  }));
  return { events };
};

interface StateProps {
  events: SelectFilterValue<string>[];
}

const ProgramDetailsPage = compose(
  React.memo,
  connect(mapStateToProps)
)(_ProgramDetailsPage);
export default ProgramDetailsPage;
