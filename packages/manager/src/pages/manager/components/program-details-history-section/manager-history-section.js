import "./manager-history.scss";

import Surface from "shared/components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import FundsTableRow from "shared/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/components/funds-table/funds-table.constants";
import ProgramTableRow from "shared/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "shared/components/programs-table/programs.constants";
import * as service from "../../services/manager.service";
import * as managerService from "../../services/manager.service";
import ManagerTable from "./manager-table/manager-table";
import { push } from "react-router-redux";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB,
    prevProps: null
  };

  componentDidMount() {
    const { managerId, service } = this.props;
    service.getFundsDispatch(managerId);
    service.getProgramsDispatch(managerId);
  }

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  getFunds = filters => {
    return service
      .getFunds(this.props.managerId, filters)
      .payload.then(data => {
        return { items: data.funds, total: data.total };
      });
  };

  getPrograms = filters => {
    return service
      .getPrograms(this.props.managerId, filters)
      .payload.then(data => {
        return { items: data.programs, total: data.total };
      });
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
    }
    return newState;
  }

  render() {
    const { tab } = this.state;
    const {
      t,
      title,
      managerId,
      isAuthenticated,
      service,
      programs,
      funds
    } = this.props;
    const { handleTabChange, getPrograms, getFunds } = this;
    return (
      <Surface className="manager-history">
        <div className="manager-history__header">
          <div className="manager-history__tabs">
            <GVTabs value={tab} onChange={handleTabChange}>
              <GVTab
                value={"programs"}
                label={t("manager.history.tabs.programs")}
              />
              <GVTab value={"funds"} label={t("manager.history.tabs.funds")} />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === PROGRAMS_TAB && (
            <ManagerTable
              data={programs}
              managerId={managerId}
              getItems={getPrograms}
              columns={PROGRAMS_COLUMNS}
              renderBodyRow={program => (
                <ProgramTableRow
                  title={title}
                  isAuthenticated={isAuthenticated}
                  program={program}
                  redirectToLogin={service.redirectToLogin}
                  toggleFavorite={service.toggleFavoriteProgram}
                />
              )}
              renderHeader={column => (
                <span
                  className={`programs-table__cell programs-table__cell--${
                    column.name
                  }`}
                >
                  {t(`programs-page.programs-header.${column.name}`)}
                </span>
              )}
            />
          )}
          {tab === FUNDS_TAB && (
            <ManagerTable
              data={funds}
              managerId={managerId}
              getItems={getFunds}
              columns={FUNDS_TABLE_COLUMNS}
              renderBodyRow={fund => (
                <FundsTableRow
                  title={title}
                  fund={fund}
                  isAuthenticated={isAuthenticated}
                  redirectToLogin={service.redirectToLogin}
                  toggleFavorite={service.toggleFavoriteFund}
                />
              )}
              renderHeader={column => (
                <span
                  className={`funds-table__cell funds-table__cell--${
                    column.name
                  }`}
                >
                  {t(`funds-page.funds-header.${column.name}`)}
                </span>
              )}
            />
          )}
        </div>
      </Surface>
    );
  }
}
const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const programs = state.programsData.items.data;
  const funds = state.fundsData.items.data;
  return { isAuthenticated, programs, funds };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      {
        ...managerService,
        toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
        toggleFavoriteFund: toggleFavoriteFundDispatchable,
        redirectToLogin: () => push(LOGIN_ROUTE)
      },
      dispatch
    )
  };
};

export default compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(ManagerHistorySection);
