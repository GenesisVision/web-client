import { PlatformInfo } from "gv-api-web";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import * as React from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { createSelector } from "reselect";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import {
  fetchHistoryCounts,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";

import ChangePasswordTradingAccount from "./components/program-controls/change-password-trading-account";
import ProgramControls from "./components/program-controls/program-controls";

const _ProgramDetailsPage: React.FC<StateProps> = ({ events }) => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer,
    ChangePasswordTradingAccount: ChangePasswordTradingAccount
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
  ManagerRootState,
  IApiState<PlatformInfo>,
  SelectFilterValue<string>[]
>(
  state => state.platformData,
  platformData => {
    if (!platformData.data) return [];
    const {
      programs
    } = platformData.data.enums.program.managerNotificationType;
    const events = programs.map((event: string) => ({
      value: event,
      labelKey: `manager.dashboard-page.portfolio-events.types.${event}`
    }));
    return events;
  }
);

const mapStateToProps = (state: ManagerRootState): StateProps => {
  return {
    events: eventsSelector(state)
  };
};

interface StateProps {
  events: SelectFilterValue<string>[];
}

const ProgramDetailsPage = React.memo(
  connect(mapStateToProps)(_ProgramDetailsPage)
);
export default ProgramDetailsPage;
