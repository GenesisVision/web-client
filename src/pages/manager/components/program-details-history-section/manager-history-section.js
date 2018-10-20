import "./manager-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import FundsTableRow from "../../../../modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "../../../../modules/funds-table/funds-table.constants";
import ProgramTableRow from "../../../../modules/programs-table/components/programs-table/program-table-row";
import { PROGRAMS_COLUMNS } from "../../../../modules/programs-table/programs.constants";
import * as service from "../../services/manager.service";
import * as managerService from "../../services/manager.service";
import ManagerTable from "./manager-table/manager-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB,
    prevProps: null,
    funds: [],
    programs: [],
    isPending: true
  };
  componentDidMount() {
    const { managerId, service } = this.props;
    return service
      .getFunds(managerId)
      .then(funds => {
        funds.value.isPending = false;
        this.setState({ funds: funds.value });
        return service.getPrograms(managerId);
      })
      .then(programs => {
        this.setState({ programs: programs.value });
      })
      .finally(() => {
        this.setState({ isPending: false });
      });
  }
  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  getFunds = filters => {
    const { managerId } = this.props;
    return service.getFunds(managerId, filters).payload.then(data => {
      return { items: data.funds, total: data.total };
    });
  };

  getPrograms = filters => {
    const { managerId } = this.props;
    return service.getPrograms(managerId, filters).payload.then(data => {
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
    const { funds, programs, tab, isPending } = this.state;
    const { t, managerId } = this.props;

    return (
      !isPending && (
        <Surface className="manager-history">
          <div className="manager-history__header">
            <div className="manager-history__tabs">
              <GVTabs value={tab} onChange={this.handleTabChange}>
                <GVTab
                  value={"programs"}
                  label={t("manager.history.tabs.programs")}
                />
                <GVTab
                  value={"funds"}
                  label={t("manager.history.tabs.funds")}
                />
              </GVTabs>
            </div>
          </div>
          <div>
            {tab === PROGRAMS_TAB && (
              <ManagerTable
                data={programs}
                managerId={managerId}
                getItems={this.getPrograms}
                columns={PROGRAMS_COLUMNS}
                renderBodyRow={program => <ProgramTableRow program={program} />}
                renderHeader={column => (
                  <span className={`programs-table__cell--${column.name}`}>
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
                renderBodyRow={fund => <FundsTableRow fund={fund} />}
                renderHeader={column => (
                  <span className={`funds-table__cell--${column.name}`}>
                    {t(`funds-page.funds-header.${column.name}`)}
                  </span>
                )}
              />
            )}
          </div>
        </Surface>
      )
    );
  }
}
const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ ...managerService, goBack }, dispatch)
  };
};

export default translate()(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(ManagerHistorySection)
);
