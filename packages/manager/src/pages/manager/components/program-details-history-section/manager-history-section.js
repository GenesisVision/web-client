import "./manager-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import FundsTableRow from "shared/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/components/funds-table/funds-table.constants";
import ProgramTableRow from "shared/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "shared/components/programs-table/programs.constants";
import Surface from "shared/components/surface/surface";
import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";

import * as service from "../../services/manager.service";
import * as managerService from "../../services/manager.service";
import ManagerTable from "./manager-table/manager-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB,
    programs: null,
    funds: null
  };

  componentDidMount() {
    this.getFunds().then(data => this.setState({ funds: data }));
    this.getPrograms().then(data => this.setState({ programs: data }));
  }

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  getFunds = filters => {
    return managerService.getFunds(this.props.managerId, filters);
  };

  getPrograms = filters => {
    return managerService.getPrograms(this.props.managerId, filters);
  };

  render() {
    const { tab, programs, funds } = this.state;
    const { t, title, managerId, isAuthenticated, service } = this.props;
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
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators(
      {
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ManagerHistorySection);
