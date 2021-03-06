import clsx from "clsx";
import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import BrokerInfoWrapper from "pages/landing-page/components/broker-info-wrapper/broker-info-wrapper";
import TabControls, {
  TTabsItem
} from "pages/landing-page/components/tab-controls/tab-controls";
import { TBrokerInfo } from "pages/landing-page/static-data/brokers";
import React, { useCallback, useState } from "react";

import styles from "./brokers-container.module.scss";

interface Props {
  darkTheme?: boolean;
  className?: string;
  title?: string;
  brokersInfo: TBrokerInfo[];
  brokersTabs: TTabsItem[];
}

const BrokerInfoWrapperWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/broker-info-wrapper/broker-info-wrapper-with-animation"
  )
);

const _BrokersContainer: React.FC<Props> = ({
  className,
  darkTheme,
  brokersInfo,
  brokersTabs,
  title
}) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [currentTabId, setCurrentTab] = useState(0);

  const handleChange = useCallback(
    (id: number) => {
      if (id !== undefined && id !== currentTabId) setCurrentTab(id);
    },
    [currentTabId]
  );

  const renderBrokersInfo = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <BrokerInfoWrapperWithAnimation
            currentBrokersInfo={brokersInfo[currentTabId]}
            darkTheme={darkTheme}
          />
        );
      case "3g":
      case "2g":
        return (
          <BrokerInfoWrapper
            currentBrokersInfo={brokersInfo[currentTabId]}
            darkTheme={darkTheme}
          />
        );
      default:
        return null;
    }
  }, [effectiveConnectionType, currentTabId]);
  return (
    <div
      className={clsx(styles["brokers-container"], className, {
        [styles["brokers-container--dark"]]: darkTheme
      })}
    >
      {title !== undefined && (
        <h2 className={styles["brokers-container__title"]}>{title}</h2>
      )}
      <div className={styles["brokers-container__wrapper-controls"]}>
        <TabControls
          currentTabId={currentTabId}
          tabsItems={brokersTabs}
          onChange={handleChange}
          variant={"brokers"}
        />
      </div>
      {renderBrokersInfo()}
    </div>
  );
};

const BrokersContainer = React.memo(_BrokersContainer);
export default BrokersContainer;
