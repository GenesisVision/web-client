import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";

import { INavigateTab } from "../programs-rating/programs-rating-container";

const _TabsContainer: React.FC<Props> = ({ tabs, tab, handleTabChange }) => (
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
  translate(),
  withRouter,
  React.memo
)(_TabsContainer);
export default TabsContainer;
