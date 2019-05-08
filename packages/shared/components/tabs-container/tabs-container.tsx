import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import GVScroll from "shared/components/scroll/gvscroll";

import { INavigateTab } from "../programs-rating/programs-rating-container";

interface ITabsContainerProps {
  tabs: INavigateTab[];
  tab: INavigateTab;
  handleTabChange(
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ): void;
}

class TabsContainer extends React.PureComponent<
  ITabsContainerProps & InjectedTranslateProps
> {
  render() {
    const { tabs, tab, handleTabChange } = this.props;
    return (
      <GVScroll autoHide autoHeight autoHeightMax={60}>
        <GVTabs value={tab.name} onChange={handleTabChange}>
          {tabs.map(tab => (
            <GVTab
              key={tab.name}
              value={tab.name}
              label={tab.label}
              count={tab.count}
            />
          ))}
        </GVTabs>
      </GVScroll>
    );
  }
}

export default compose<React.ComponentType<ITabsContainerProps>>(
  translate(),
  withRouter
)(TabsContainer);
