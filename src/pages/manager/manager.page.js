import "./manager.page.scss";

import Page from "components/page/page";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators } from "redux";
import replaceParams from "utils/replace-params";

import { SLUG_URL_REGEXP } from "../../utils/constants";
import ManagerDescriptionContainer from "./components/manager-description/manager-description-container";
import ManagerHistorySection from "./components/program-details-history-section/manager-history-section";
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
    const { t, service } = this.props;
    const { managerProfile, isPending } = this.state;

    return (
      !isPending && (
        <Page title={`${t("manager.title")} ${managerProfile.username}`}>
          <div className="manager">
            <div className="manager__description">
              <ManagerDescriptionContainer
                managerProfile={managerProfile}
                goBack={service.goBack}
              />
            </div>
            <div className="manager__history">
              <ManagerHistorySection
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
    managerProfile: state.manager.data
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
