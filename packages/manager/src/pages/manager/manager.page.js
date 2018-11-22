import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import ManagerDescription from "shared/components/manager/manager-description/manager-description";
import ManagerView from "shared/components/manager/manager.view";
import { SLUG_URL_REGEXP } from "shared/utils/constants";
import replaceParams from "shared/utils/replace-params";

import ManagerHistoryContainer from "./components/manager-history/manager-history.container";
import * as managerService from "./services/manager.service";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const composeManagerDetailsUrl = slugUrl =>
  replaceParams(MANAGER_DETAILS_ROUTE, {
    [`:${MANAGER_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

class ManagerPage extends Component {
  state = {
    managerProfile: {},
    funds: [],
    programs: [],
    isPending: true
  };
  componentDidMount() {
    const { service } = this.props;
    service.fetchManagerProfile().then(profile => {
      this.setState({ managerProfile: profile, isPending: false });
    });
  }
  render() {
    const { managerProfile, isPending } = this.state;

    return (
      !isPending && (
        <ManagerView
          username={managerProfile.username}
          renderDescription={() => (
            <ManagerDescription managerProfile={managerProfile} />
          )}
          renderHistory={() => (
            <ManagerHistoryContainer
              managerId={managerProfile.id}
              title={managerProfile.username}
            />
          )}
        />
      )
    );
  }
}
const mapStateToProps = state => {
  return {
    managerProfile: state.manager.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ ...managerService }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerPage);
