import classNames from "classnames";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import EventListener from "react-event-listener";

import styles from "./upper-button.module.scss";

export const UpperButtonContainer: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const debouncedSetScrollFunc = useCallback(
    debounce(() => setScrollTop(window.scrollY), 300),
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
      <UpperButton visible={visible} />
    </>
  );
};

export const UpperButton: React.FC<{ visible: boolean }> = ({ visible }) => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <>
      <div
        onClick={handleClick}
        className={classNames(styles["upper-button"], {
          [styles["upper-button--visible"]]: visible
        })}
      >
        <div className={styles["upper-button__arrow"]}>&uarr;</div>
      </div>
    </>
  );
};
