import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getPortfolioChart } from "../../../services/dashboard-chart.service";
import DashboardPortfolioChartSection from "./dashboard-portfolio-chart-section";

const mapStateToProps = state => {
  const { data, isPending } = state.dashboard.portfolioChartData;
  const { currency } = state.accountSettings;
  return { data, isPending, currency };
};

const mapDispatchToProps = dispatch => {
  return { service: bindActionCreators({ getPortfolioChart }, dispatch) };
};

const DashboardPortfolioChartSectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPortfolioChartSection);

export default DashboardPortfolioChartSectionContainer;
