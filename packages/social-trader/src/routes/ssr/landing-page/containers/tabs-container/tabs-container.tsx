import "./tabs-container.scss";

import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import TabControls from "routes/ssr/landing-page/components/tab-controls/tab-controls";
import TabInfoList from "routes/ssr/landing-page/components/tab-info-list/tab-info-list";

enum TABS {
  TRADE = "Trade",
  INVEST = "Invest",
  PARTAKE = "Partake"
}

const tabsItems = [
  {
    id: 0,
    name: "Trade"
  },
  {
    id: 1,
    name: "Invest"
  },
  {
    id: 2,
    name: "Partake"
  }
];

const tabInfo = [
  {
    id: 0,
    title: TABS.TRADE,
    text:
      "Receive a 100% bonus on any deposit made on Genesis Markets. The bonus is unlocked as soon as you start trading!"
  },
  {
    id: 1,
    title: TABS.INVEST,
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!"
  },
  {
    id: 2,
    title: TABS.PARTAKE,
    text:
      "Use the Genesis Vision two-level Affiliate Network to receive a percentage of the commission paid by the people you invite, and also the people who were invited by them!"
  }
];

const TabsContainer: React.FC = () => {
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );

  const transitions = useTransition(tabInfo[currentTabId], item => item.id, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
    config: config.slow
  });
  return (
    <div className="tabs-container">
      <div className="tabs-container__wrapper-controls">
        <TabControls
          currentTabId={currentTabId}
          tabsItems={tabsItems}
          onChange={handleChange}
          className="tabs-container__controls"
        />
      </div>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className="tabs-container__tab-info"
          key={key}
          style={{
            ...props
          }}
        >
          <TabInfoList />
        </animated.div>
      ))}
    </div>
  );
};

export default TabsContainer;
