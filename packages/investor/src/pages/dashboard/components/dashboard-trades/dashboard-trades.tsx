import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import * as React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";

interface IDashboardTradesProps {
  title: string;
}

const _DashboardTrades: React.FC<IDashboardTradesProps> = ({ title }) => {
  return <CopytradingTablesSection title={title} />;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({}, dispatch)
});

const DashboardTrades = compose<React.ComponentType<IDashboardTradesProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_DashboardTrades);
export default DashboardTrades;
