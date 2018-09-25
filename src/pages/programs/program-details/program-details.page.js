import "./program-details.scss";

import Page from "components/page/page";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import NotFoundPage from "../../not-found/not-found.routes";
import ProgramDetailsChartContainer from "./components/program-details-chart/program-details-chart-container";
import ProgramDetailsDescriptionSection from "./components/program-details-description/program-details-description-section";
import ProgramDetailsNavigation from "./components/program-details-description/program-details-navigation/program-details-navigation";
import ProgramDetailsHistoryContainer from "./components/program-details-history/program-details-history-container";
import { getProgramDetails } from "./services/program-details.service";

class ProgramDetailsPage extends PureComponent {
  state = {
    errorCode: null
  };

  constructor(props) {
    super(props);
    this.description = { data: null, isPending: false };
  }
  componentDidMount() {
    const { service } = this.props;
    this.setState({ isPending: true });
    service.getProgramDetails().then(data => {
      this.description = data;
      this.setState({ errorCode: data.code });
    });
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
          <div className="program-details__description">
            <ProgramDetailsNavigation goBack={service.goBack} />
            <ProgramDetailsDescriptionSection
              programDetailsData={this.description}
            />
          </div>
          {/* <div className="program-details__chart">
            <ProgramDetailsChartContainer />
          </div>
          <div className="program-details__history">
            <ProgramDetailsHistoryContainer />
          </div> */}
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getProgramDetails, goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
