import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { TranslationFunction, translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

enum TRADES_TABS {
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface IDashboardTradesProps {
  title: any;
  t: TranslationFunction;
}

interface IDashboardTradesState {
  tab: TRADES_TABS;
}

class DashboardTrades extends Component<
  IDashboardTradesProps,
  IDashboardTradesState
> {
  state = {
    tab: TRADES_TABS.OPEN_TRADES,
    programsCount: undefined,
    fundsCount: undefined
  };

  componentDidMount() {
    // const { fetchAssetsCount } = this.props;
    // fetchAssetsCount().then(data => {
    //   this.setState({ ...data });
    // });
  }

  handleTabChange = (e: any, tab: string) => {
    this.setState({ tab: tab as TRADES_TABS });
  };

  render() {
    const { tab, programsCount, fundsCount } = this.state;
    const { t } = this.props;
    return (
      <Surface className="">
        <div className="">
          <h3>{t("investor.dashboard-page.trades.title")}</h3>
          <div className="">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={TRADES_TABS.OPEN_TRADES}
                label={t("investor.dashboard-page.trades.open-trades")}
                count={programsCount}
              />
              <GVTab
                value={TRADES_TABS.HISTORY}
                label={t("investor.dashboard-page.trades.history")}
                count={fundsCount}
              />
            </GVTabs>
          </div>
        </div>
        <div className="">
          {tab === TRADES_TABS.OPEN_TRADES && 1}
          {tab === TRADES_TABS.HISTORY && 2}
        </div>
      </Surface>
    );
  }
}

export default translate()(DashboardTrades);
