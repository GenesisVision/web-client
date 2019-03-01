import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import {
  ICopytradingTradesCounts,
  fetchCopytradingTradesCount
} from "../services/copytrading-tables.service";
import OpenTradesTable from "./open-trades-table";
import TradesHistoryTable from "./trades-history-table";

enum TRADES_TABS {
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface ICopytradingTablesSectionProps {
  title: string;
  currency?: string;
}

interface ICopytradingTablesSectionState extends ICopytradingTradesCounts {
  tab: TRADES_TABS;
}

class ICopytradingTablesSection extends Component<
  ICopytradingTablesSectionProps & InjectedTranslateProps,
  ICopytradingTablesSectionState
> {
  state = {
    tab: TRADES_TABS.OPEN_TRADES,
    openTradesCount: undefined,
    historyCount: undefined
  };

  componentDidMount() {
    fetchCopytradingTradesCount(this.props.currency).then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e: any, tab: string) => {
    this.setState({ tab: tab as TRADES_TABS });
  };

  render() {
    const { tab, openTradesCount, historyCount } = this.state;
    const { t, title, currency } = this.props;
    return (
      <Surface>
        <div className="dashboard-assets__head">
          <h3>{t("investor.copytrading-tables.title")}</h3>
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={TRADES_TABS.OPEN_TRADES}
              label={t("investor.copytrading-tables.open-trades")}
              count={openTradesCount}
            />
            <GVTab
              value={TRADES_TABS.HISTORY}
              label={t("investor.copytrading-tables.history")}
              count={historyCount}
            />
          </GVTabs>
        </div>
        <div className="">
          {tab === TRADES_TABS.OPEN_TRADES && (
            <OpenTradesTable title={title} currency={currency} />
          )}
          {tab === TRADES_TABS.HISTORY && (
            <TradesHistoryTable title={title} currency={currency} />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(ICopytradingTablesSection);
