import "./program-details.scss";

import Page from "components/page/page";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import getParams from "../../../utils/get-params";
import NotFoundPage from "../../not-found/not-found.routes";
import { PROGRAM_DETAILS_ROUTE } from "../programs.routes";
import ProgramDetailsDescriptionSection from "./components/program-details-description-section/program-details-description-section";
import ProgramDetailsHistorySection from "./components/program-details-history-section/program-details-history-section";
import ProgramDetailsNavigation from "./components/program-details-navigation/program-details-navigation";
import ProgramDetailsStatisticSection from "./components/program-details-statistic-section/program-details-statistic-section";
import {
  getChartAndEndTrades,
  getEvents,
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
    this.trades = { data: null, isPending: true };
    this.events = { data: null, isPending: true };
  }

  componentDidMount() {
    const { service } = this.props;
    this.setState({ isPending: true });
    service
      .getProgramDescription()
      .then(data => {
        this.description = data;
        this.setState({ isPending: false });
      })
      .then(() => {
        this.setState({ isPending: true });
        return service.getChartAndEndTrades();
      })
      .then(values => {
        this.chart = values[0];
        this.trades = values[1];
        this.setState({ isPending: false });
      })
      .then(() => {
        this.setState({ isPending: true });
        return service.getEvents();
      })
      .then(data => {
        this.events = data;
        this.setState({ isPending: false });
      })
      .catch(e => {
        const errorCode = e.code;
        this.setState({ errorCode });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
  }
  render() {
    const { t, service, programId, currency } = this.props;
    const { errorCode } = this.state;
    if (errorCode) {
      return <NotFoundPage />;
    }

    return (
      <Page title={t("program-details-page.title")}>
        <div className="program-details">
          {/* <div className="program-details__section">
            <ProgramDetailsNavigation goBack={service.goBack} />
            <ProgramDetailsDescriptionSection
              programDescriptionData={this.description}
            />
          </div> */}
          <div className="program-details__section">
            <ProgramDetailsStatisticSection statisticData={this.chart} />
          </div>
          <div className="program-details__history">
            <ProgramDetailsHistorySection
              programId={programId}
              currency={currency}
              tradesData={this.trades}
              eventsData={this.events}
            />
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { routing, accountSettings } = state;

  return {
    programId: getParams(routing.location.pathname, PROGRAM_DETAILS_ROUTE)
      .programId,
    currency: accountSettings.currency
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getProgramDescription, getChartAndEndTrades, getEvents, goBack },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProgramDetailsPage);
