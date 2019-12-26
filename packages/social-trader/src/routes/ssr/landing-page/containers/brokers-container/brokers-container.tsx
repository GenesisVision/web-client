import "./brokers-container.scss";

import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import BrokerInfo from "routes/ssr/landing-page/components/broker-info/broker-info";
import TabControls from "routes/ssr/landing-page/components/tab-controls/tab-controls";
import {
  brokersInfo,
  brokersTabs
} from "routes/ssr/landing-page/static-data/brokers";

interface Props {
  darkTheme?: boolean;
  className?: string;
}

const _BrokersContainer: React.FC<Props> = ({ className, darkTheme }) => {
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );

  const transitions = useTransition(
    brokersInfo[currentTabId],
    item => item.id,
    {
      from: { opacity: 0, position: "absolute" },
      enter: { opacity: 1, position: "static" },
      leave: { opacity: 0, position: "absolute" },
      config: config.slow
    }
  );
  return (
    <div
      className={classNames("brokers-container", className, {
        "brokers-container--dark": darkTheme
      })}
    >
      <h2 className="brokers-container__title">Brokers and Exhanges</h2>
      <div className="brokers-container__wrapper-controls">
        <TabControls
          currentTabId={currentTabId}
          tabsItems={brokersTabs}
          onChange={handleChange}
          className="brokers-container__controls"
        />
      </div>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className="brokers-container__tab-info"
          key={key}
          style={{
            ...props
          }}
        >
          <BrokerInfo
            id={item.id}
            title={item.title}
            description={item.description}
            listItems={item.listItems}
          />
        </animated.div>
      ))}
    </div>
  );
};

_BrokersContainer.defaultProps = {
  darkTheme: false
};

const BrokersContainer = React.memo(_BrokersContainer);
export default BrokersContainer;
