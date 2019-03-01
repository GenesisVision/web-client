import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import React, { ComponentType, FunctionComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";

interface IDashboardTradesProps {
  title: string;
}

const DashboardTrades: FunctionComponent<IDashboardTradesProps> = ({
  title
}) => {
  return <CopytradingTablesSection title={title} />;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({}, dispatch)
});

export default compose<ComponentType<IDashboardTradesProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardTrades);
