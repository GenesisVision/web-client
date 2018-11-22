import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import ManagerHistory from "shared/components/manager/manager-history/manager-history";
import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";

import * as managerService from "../../services/manager.service";

class ManagerHistoryContainer extends PureComponent {
  state = {
    programs: null,
    funds: null
  };

  componentDidMount() {
    this.getFunds().then(data => this.setState({ funds: data }));
    this.getPrograms().then(data => this.setState({ programs: data }));
  }

  getFunds = filters => {
    return managerService.getFunds(this.props.managerId, filters);
  };

  getPrograms = filters => {
    return managerService.getPrograms(this.props.managerId, filters);
  };

  render() {
    const { programs, funds } = this.state;
    const { title, managerId, isAuthenticated, service } = this.props;
    const { handleTabChange, getPrograms, getFunds } = this;
    return (
      <ManagerHistory
        programs={programs}
        funds={funds}
        title={title}
        managerId={managerId}
        isAuthenticated={isAuthenticated}
        redirectToLogin={service.redirectToLogin}
        toggleFavoriteFund={service.toggleFavoriteFund}
        toggleFavoriteProgram={service.toggleFavoriteProgram}
        handleTabChange={handleTabChange}
        getPrograms={getPrograms}
        getFunds={getFunds}
      />
    );
  }
}
const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      {
        toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
        toggleFavoriteFund: toggleFavoriteFundDispatchable,
        redirectToLogin: () => push(LOGIN_ROUTE)
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerHistoryContainer);
