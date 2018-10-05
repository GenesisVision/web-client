import "./program-details-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramTrades from "./program-trades/program-trades";

const TRADES_TAB = "trades";
const EVENTS_TAB = "events";
class ProgramDetailsHistorySection extends PureComponent {
  state = {
    tab: TRADES_TAB,
    tradesData: { data: null, isPending: true },
    prevProps: null
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.tradesData = props.tradesData;
    }
    return newState;
  }

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
          {tab === TRADES_TAB && (
            <ProgramTrades
              trades={tradesData.data}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === EVENTS_TAB && "Events"}
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsHistorySection);
