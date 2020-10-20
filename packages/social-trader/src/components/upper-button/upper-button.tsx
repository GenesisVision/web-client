import clsx from "clsx";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import EventListener from "react-event-listener";

import styles from "./upper-button.module.scss";

export interface IUpperButtonProps {
  visible: boolean;
}

interface IUpperButtonContainerProps {
  Button?: React.ComponentType<IUpperButtonProps>;
}

export const UpperButtonContainer: React.FC<IUpperButtonContainerProps> = ({
  Button = UpperButton
}) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const debouncedSetScrollFunc = useCallback(
    debounce(() => setScrollTop(window.scrollY), 100),
    []
  );
  const handleScroll = useCallback(() => debouncedSetScrollFunc(), []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setScrollTop(window.scrollY);
  }, []);

  useEffect(() => {
    if (scrollTop > windowHeight) setVisible(true);
    else setVisible(false);
  }, [scrollTop]);

  return (
    <>
      <EventListener target={"window"} onScroll={handleScroll} />
      <Button visible={visible} />
    </>
  );
};

export const UpperButton: React.FC<IUpperButtonProps> = ({ visible }) => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <>
      <div
        onClick={handleClick}
        className={clsx(styles["upper-button"], {
          [styles["upper-button--visible"]]: visible
        })}
      >
        <div className={styles["upper-button__arrow"]}>&uarr;</div>
      </div>
    </>
  );
};
