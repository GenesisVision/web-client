import "./info-container.scss";

import React, { useCallback, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import InfoList from "routes/ssr/landing-page/components/info-list/info-list";
import TabControls from "routes/ssr/landing-page/components/tab-controls/tab-controls";
import { infoList, infoTabs } from "routes/ssr/landing-page/static-data/info";

const InfoContainer: React.FC = () => {
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );

  const transitions = useTransition(infoList[currentTabId], item => item.id, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
    config: config.slow
  });
  return (
    <div className="info-container">
      <div className="info-container__wrapper-controls">
        <TabControls
          currentTabId={currentTabId}
          tabsItems={infoTabs}
          onChange={handleChange}
          className="info-container__controls"
        />
      </div>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className="info-container__tab-info"
          key={key}
          style={props as any}
        >
          <InfoList id={item.id} listItems={item.listItems} />
        </animated.div>
      ))}
    </div>
  );
};

export default InfoContainer;
