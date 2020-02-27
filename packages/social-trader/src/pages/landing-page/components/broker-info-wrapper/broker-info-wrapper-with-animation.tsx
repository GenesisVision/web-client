import BrokerInfo from "pages/landing-page/components/broker-info/broker-info";
import { TBrokerInfo } from "pages/landing-page/static-data/brokers";
import React from "react";
import { animated, config, useTransition } from "react-spring";

interface Props {
  darkTheme?: boolean;
  currentBrokersInfo: TBrokerInfo;
}

const _BrokerInfoWrapperWithAnimation: React.FC<Props> = ({
  currentBrokersInfo,
  darkTheme
}) => {
  const transitions = useTransition(currentBrokersInfo, item => item.id, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
    config: config.slow
  });
  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className="brokers-container__tab-info"
          key={key}
          style={props as any}
        >
          <BrokerInfo
            type={item.type}
            darkTheme={darkTheme}
            id={item.id}
            title={item.title}
            description={item.description}
            listItems={item.listItems}
          />
        </animated.div>
      ))}
    </>
  );
};

const BrokerInfoWrapperWithAnimation = React.memo(
  _BrokerInfoWrapperWithAnimation
);
export default BrokerInfoWrapperWithAnimation;
