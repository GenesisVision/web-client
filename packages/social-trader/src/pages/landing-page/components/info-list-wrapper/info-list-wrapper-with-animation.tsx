import InfoList from "pages/landing-page/components/info-list/info-list";
import { TInfoList } from "pages/landing-page/static-data/info";
import React from "react";
import { animated, config, useTransition } from "react-spring";

import styles from "./info-list-wrapper.module.scss";

interface Props {
  currentInfoList: TInfoList;
}

const _InfoListWrapperWithAnimation: React.FC<Props> = ({
  currentInfoList
}) => {
  const transitions = useTransition(currentInfoList, item => item.id, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
    config: config.slow
  });
  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className={styles["info-list-wrapper"]}
          key={key}
          style={props as any}
        >
          <InfoList id={item.id} listItems={item.listItems} />
        </animated.div>
      ))}
    </>
  );
};

const InfoListWrapperWithAnimation = React.memo(_InfoListWrapperWithAnimation);
export default InfoListWrapperWithAnimation;
