import "./advantages-container.scss";

import React, { useCallback, useEffect, useRef } from "react";
import { animated, useTrail } from "react-spring";
import AdvantagesList from "routes/ssr/landing-page/components/advantages-list/advantages-list";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { advantagesItems } from "routes/ssr/landing-page/static-data/advantages";
import { TRADE_ROUTE } from "routes/trade.routes";

const translate = (x: number, y: number) => `translate3d(${x}px,${y}px,0)`;
const config = { tension: 1200, friction: 40 };

const AdvantagesContainer: React.FC = () => {
  const section = useRef<HTMLDivElement>(null);
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
        if (deltaY < 50 || deltaBottomY < 50) return;
        //@ts-ignore
        set({ xy: [deltaX, deltaY] });
      }
    },
    []
  );
  return (
    <section
      className="home__section home__section--bg-white"
      onMouseMove={handleMouseMove}
      ref={section}
    >
      {trail.map((props, index) => (
        <animated.div
          key={index}
          className="advantages-container__sticky-button"
          //@ts-ignore
          style={{ transform: props.xy.interpolate(translate) }}
        >
          <LPButton href={TRADE_ROUTE}>Join</LPButton>
        </animated.div>
      ))}
      <div className="home__container" key="Our advantages">
        <div className="advantages-container">
          <h2 className="advantages-container__title">Our advantages</h2>
          <AdvantagesList
            advantagesItems={advantagesItems}
            className="advantages-container__list"
            lastItem={<LPButton href={TRADE_ROUTE}>Join</LPButton>}
          />
        </div>
      </div>
    </section>
  );
};

export default AdvantagesContainer;
