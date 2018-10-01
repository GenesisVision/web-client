import "./program-details-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramTrades from "./program-trades/program-trades";

class ProgramDetailsHistorySection extends PureComponent {
  state = {
    tab: "trades"
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { t, programId, currency, tradesData, eventsData } = this.props;
    if (!tradesData) return null;
    return (
      <Surface className="program-details-history">
        <div className="program-details-history__header">
          <h2>{t("program-details-page.history.heading")}</h2>
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={"trades"}
              label={t("program-details-page.history.tabs.trades")}
            />
            <GVTab
              value={"events"}
              label={t("program-details-page.history.tabs.events")}
            />
          </GVTabs>
        </div>
        <div>
          {tab === "trades" && (
            <ProgramTrades
              trades={tradesData.data}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === "events" && "Events"}
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsHistorySection);
