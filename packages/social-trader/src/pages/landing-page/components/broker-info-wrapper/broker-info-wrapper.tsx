import BrokerInfo from "pages/landing-page/components/broker-info/broker-info";
import { TBrokerInfo } from "pages/landing-page/static-data/brokers";
import React from "react";

import styles from "./brokers-info-wrapper.module.scss";

interface Props {
  darkTheme?: boolean;
  currentBrokersInfo: TBrokerInfo;
}

const _BrokerInfoWrapper: React.FC<Props> = ({
  darkTheme,
  currentBrokersInfo
}) => {
  return (
    <div className={styles["brokers-info-wrapper"]}>
      <BrokerInfo
        type={currentBrokersInfo.type}
        darkTheme={darkTheme}
        id={currentBrokersInfo.id}
        title={currentBrokersInfo.title}
        description={currentBrokersInfo.description}
        listItems={currentBrokersInfo.listItems}
      />
    </div>
  );
};

const BrokerInfoWrapper = React.memo(_BrokerInfoWrapper);
export default BrokerInfoWrapper;
