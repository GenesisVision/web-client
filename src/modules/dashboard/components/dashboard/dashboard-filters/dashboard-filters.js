import React, { Component } from "react";
import { connect } from 'react-redux'
import classnames from "classnames";

import dashboardActions from "../../../actions/dashboard-actions";

import "./dashboard-filters.css";

class DashboardFilters extends Component {
  render() {
    return (
      <div className="dashboard-program-list-tabs">
        <span
          className={classnames("dashboard-program-tab", {
            "dashboard-program-tab--active": true
          })}
          onClick={this.props.fetchDashboardPrograms}
        >
          Portfolio
        </span>
        <span
          className={classnames("dashboard-program-tab", {
            "dashboard-program-tab--active": true
          })}
          onClick={this.props.fetchFavoritePrograms}
        >
          Favorite Programms
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDashboardPrograms: () => {
    dispatch(dashboardActions.fetchDashboardPrograms());
  },
  fetchFavoritePrograms: () => {
    dispatch(dashboardActions.fetchFavoritesPrograms());
  },
});

export default connect(undefined, mapDispatchToProps)(DashboardFilters);
