import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import GVScroll from "shared/components/scroll/gvscroll";

import { INavigateTab } from "../programs-rating/programs-rating-container";

const _TabsContainer: React.FC<Props> = ({ tabs, tab, handleTabChange }) => (
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

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  tabs: INavigateTab[];
  tab: INavigateTab;
  handleTabChange(
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ): void;
}

const TabsContainer = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate(),
  withRouter
)(_TabsContainer);
export default TabsContainer;
