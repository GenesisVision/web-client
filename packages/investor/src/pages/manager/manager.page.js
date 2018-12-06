import "./manager.page.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";
import ManagerDescription from "shared/components/manager/manager-description/manager-description";
import ManagerHistorySection from "shared/components/manager/manager-history/manager-history-section";
import Page from "shared/components/page/page";
import { SLUG_URL_REGEXP } from "shared/utils/constants";

import * as managerService from "./services/manager.service";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

class ManagerPage extends Component {
  state = {
    managerProfile: {},
    isPending: true
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchManagerProfile().then(profile => {
      this.setState({ managerProfile: profile, isPending: false });
    });
  }

  render() {
    const { t, isAuthenticated } = this.props;
    const { managerProfile, isPending } = this.state;

    return (
      !isPending && (
        <Page title={`${t("manager.title")} ${managerProfile.username}`}>
          <div className="manager">
            <div className="manager__description">
              <ManagerDescription managerProfile={managerProfile} />
            </div>
            <div className="manager__history">
              <ManagerHistorySection
                isAuthenticated={isAuthenticated}
                managerService={managerService}
                managerId={managerProfile.id}
                title={managerProfile.username}
              />
            </div>
          </div>
        </Page>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    managerProfile: state.manager.data,
    isAuthenticated: state.authData.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ ...managerService, goBack }, dispatch)
  };
};

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManagerPage)
);
