import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { normalizeFilteringSelector } from "../../../../../filtering/selectors/filtering-selectors";
import { TYPE_FILTER_NAME } from "../../../../dashboard.constants";
import dashboardService from "../../../../service/dashboard-service";
import DashboardProgramListTabs from "./dashboard-program-list-tabs/dashboard-program-list-tabs";

class DashboardProgramListTabsContainer extends PureComponent {
  componentDidMount() {
    const {
      filtering: { defaultFilters }
    } = this.props;
    this.handleFilterChange(defaultFilters[TYPE_FILTER_NAME])();
  }

  handleFilterChange = value => () => {
    this.props.handleFilterChange({
      name: TYPE_FILTER_NAME,
      value
    });
  };

  render() {
    return (
      <DashboardProgramListTabs
        type={TYPE_FILTER_NAME}
        onFilterChange={this.handleFilterChange}
      />
    );
  }
}
const mapStateToProps = state => {
  const filtering = normalizeFilteringSelector(state.dashboardData.programs);
  return { filtering };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(dashboardService.updateFiltering(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardProgramListTabsContainer
);
