import "./manager-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import FundsTableRow from "shared/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/components/funds-table/funds-table.constants";
import ProgramTableRow from "shared/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "shared/components/programs-table/programs.constants";
import Surface from "shared/components/surface/surface";
import { toggleFavoriteFundDispatchable } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";

import ManagerTable from "./manager-table/manager-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB,
    funds: null,
    programs: null,
    isPending: true
  };

  componentDidMount() {
    this.getFunds()
      .then(funds => {
        this.setState({ funds: funds });
        return this.getPrograms();
      })
      .then(programs => {
        this.setState({ programs: programs, isPending: false });
      });
  }

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  getFunds = filters => {
    return this.props.managerService.getFunds(this.props.managerId, filters);
  };

  getPrograms = filters => {
    return this.props.managerService.getPrograms(this.props.managerId, filters);
  };

  render() {
    const { tab, isPending, programs, funds } = this.state;
    const { t, title, managerId, isAuthenticated, service } = this.props;
    const { handleTabChange } = this;
    return (
      <Surface className="manager-history">
        <div className="manager-history__tabs">
          <GVTabs value={tab} onChange={handleTabChange}>
            <GVTab
              value={"programs"}
              label={t("manager.history.tabs.programs")}
            />
            <GVTab value={"funds"} label={t("manager.history.tabs.funds")} />
          </GVTabs>
        </div>
        {!isPending && (
          <div>
            {tab === PROGRAMS_TAB && (
              <ManagerTable
                data={programs}
                managerId={managerId}
                getItems={this.getPrograms}
                columns={PROGRAMS_COLUMNS}
                renderBodyRow={program => (
                  <ProgramTableRow
                    title={title}
                    isAuthenticated={isAuthenticated}
                    program={program}
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
                getItems={this.getFunds}
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
        )}
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
        toggleFavoriteFund: toggleFavoriteFundDispatchable
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
