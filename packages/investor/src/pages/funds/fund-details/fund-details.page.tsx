import "shared/components/details/details.scss";

import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { compose } from "redux";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";
import {
  EVENT_LOCATION,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { fundEventsSelector } from "shared/reducers/platform-reducer";

import FundControls from "./components/fund-controls";

const _FundDetailsPage: React.FC<Props> = ({ events }) => {
  const descriptionSection = {
    FundWithdrawalContainer: FundWithdrawalContainer,
    FundControls: FundControls
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents(EVENT_LOCATION.Asset),
    eventTypeFilterValues: events
  };

  return (
    <FundDetailsPageCommon
      descriptionSection={descriptionSection}
      historySection={historySection}
    />
  );
};

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  events: fundEventsSelector(state)
});

interface Props extends OwnProps, StateProps {}

interface OwnProps {}

interface StateProps {
  events: SelectFilterValue<string>[];
}

const FundDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_FundDetailsPage);
export default FundDetailsPage;
