import "./manager-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import FundsTableRow from "shared/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/components/funds-table/funds-table.constants";
import ProgramTableRow from "shared/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "shared/components/programs-table/programs.constants";
import Surface from "shared/components/surface/surface";

import ManagerTable from "../manager-table/manager-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistory extends PureComponent {
  state = {
    tab: PROGRAMS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const {
      t,
      title,
      managerId,
      isAuthenticated,
      redirectToLogin,
      toggleFavoriteProgram,
      toggleFavoriteFund,
      getPrograms,
      getFunds,
      programs,
      funds
    } = this.props;

    const { handleTabChange } = this;
    const { tab } = this.state;
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
                  redirectToLogin={redirectToLogin}
                  toggleFavorite={toggleFavoriteProgram}
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
                  redirectToLogin={redirectToLogin}
                  toggleFavorite={toggleFavoriteFund}
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

export default translate()(ManagerHistory);
