import "./program-details-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";

import ProgramTrades from "./program-trades/program-trades";

class ProgramDetailsHistory extends Component {
  state = {
    tab: "trades"
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    return (
      <Surface className="program-details-history">
        <div className="program-details-history__header">
          <h2>History</h2>
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab value={"trades"} label="Trades" />
            <GVTab value={"events"} label="Events" />
          </GVTabs>
        </div>
        <div>
          {tab === "trades" && (
            <div className="program-details-trades">
              <ProgramTrades />
            </div>
          )}
          {tab === "events" && "Events"}
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsHistory);
