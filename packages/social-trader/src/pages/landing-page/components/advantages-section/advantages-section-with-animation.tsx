import { useTranslation } from "i18n";
import { AdvantagesListContainer } from "pages/landing-page/components/advantages-section/advantages.blocks";
import { JoinButton } from "pages/landing-page/components/join-button";
import React, { useCallback, useEffect, useRef } from "react";
import { animated, useTrail } from "react-spring";
import { TRADE_ROUTE } from "routes/trade.routes";

import styles from "./advantages-section.module.scss";

const translate = (x: number, y: number) => `translate3d(${x}px,${y}px,0)`;
const config = { tension: 1200, friction: 40 };
const INDENT = 51;

const AdvantagesSectionWithAnimation: React.FC = () => {
  const { t } = useTranslation();
  const section = useRef<any>(null);
  const [trail, set] = useTrail(1, () => ({
    xy: [600, 600],
    config: config
  }));
  useEffect(() => {
    if (section.current) {
      const posSection = section.current.getBoundingClientRect();
      //@ts-ignore
      set({ xy: [posSection.width / 2, posSection.height - 100] });
    }
  }, []);
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (section.current) {
        const posSection = section.current.getBoundingClientRect();
        const deltaX = event.clientX - posSection.x;
        const deltaY = event.clientY - posSection.y;
        const deltaBottomY = posSection.bottom - event.clientY;
        const deltaRightX = posSection.right - event.clientX;
        if (
          deltaY < INDENT ||
          deltaBottomY < INDENT ||
          deltaRightX < INDENT ||
          deltaX < INDENT
        )
          return;
        //@ts-ignore
        set({ xy: [deltaX, deltaY] });
      }
    },
    []
  );
  return (
    <div onMouseMove={handleMouseMove} ref={section}>
      {trail.map((props, index) => (
        <animated.div
          key={index}
          className={styles["advantages-section__sticky-button"]}
          //@ts-ignore
          style={{ transform: props.xy.interpolate(translate) }}
        >
          <JoinButton href={TRADE_ROUTE} circle>
            {t("landing-page:buttons.join")}
          </JoinButton>
        </animated.div>
      ))}
      <AdvantagesListContainer animation />
    </div>
  );
};

export default AdvantagesSectionWithAnimation;
