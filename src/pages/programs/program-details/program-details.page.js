import "./program-details.scss";

import Page from "components/page/page";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import NotFoundPage from "../../not-found/not-found.routes";
import ProgramDetailsDescriptionSection from "./components/program-details-description-section/program-details-description-section";
import ProgramDetailsNavigation from "./components/program-details-navigation/program-details-navigation";
import ProgramDetailsStatisticSection from "./components/program-details-statistic-section/program-details-statistic-section";
import {
  getChartAndEndHistory,
  getProgramDescription
} from "./services/program-details.service";

class ProgramDetailsPage extends PureComponent {
  state = {
    errorCode: null,
    isPending: false
  };

  constructor(props) {
    super(props);
    this.description = { data: null, isPending: true };
    this.chart = { data: null, isPending: true };
  }

  componentDidMount() {
    const { service } = this.props;
    this.setState({ isPending: true });
    service
      .getProgramDescription()
      .then(data => {
        this.description = data;
        const errorCode = data.code;
        this.setState({ errorCode, isPending: false });
        if (errorCode) {
          throw new Error(errorCode);
        }
      })
      .then(() => {
        this.setState({ isPending: true });
        return service.getChartAndEndHistory();
      })
      .then(values => {
        this.chart = values[0];
        this.setState({ isPending: false });
      })
      .catch();
  }
  render() {
    const { t, service } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    return (
      <Page title={t("program-details-page.title")}>
        <div className="program-details">
          <div className="program-details__section">
            <ProgramDetailsNavigation goBack={service.goBack} />
            <ProgramDetailsDescriptionSection
              programDescriptionData={this.description}
            />
          </div>
          <div className="program-details__section">
            <ProgramDetailsStatisticSection chartData={this.chart} />
          </div>
          {/*<div className="program-details__history">
            <ProgramDetailsHistoryContainer />
          </div> */}
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getProgramDescription, getChartAndEndHistory, goBack },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
