import "./first-slider.scss";

import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import {
  JOIN_ROUTE,
  START_ROUTE
} from "routes/ssr/landing-page/static-data/nav-links";
import { TSlides } from "routes/ssr/landing-page/static-data/slides";

import { Arrow } from "./arrow/arrow";

interface Props {
  className?: string;
  slidesItems: TSlides[];
}

const _FirstSlider: React.FC<Props> = ({ className, slidesItems }) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slidesItems[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 220, friction: 120 }
  });
  const countsSlides = slidesItems.length;
  const onClickLeft = useCallback(
    () => setIndex(state => (state === 0 ? countsSlides - 1 : state - 1)),
    []
  );
  const onClickRight = useCallback(
    () => setIndex(state => (state + 1) % countsSlides),
    []
  );
  return (
    <div className={classNames("slider", className)}>
      <div className="slider__img-wrapper">
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            className="slider__img-animate"
            style={{
              ...props
            }}
          >
            <img src={item.url} alt={item.title} className="slider__img" />
          </animated.div>
        ))}
      </div>
      <div className="slider__info-wrapper">
        <div className="slider__info">
          {transitions.map(({ item, props, key }) => (
            <animated.div
              className="slider__info-animate"
              key={key}
              style={{ ...props }}
            >
              <h2 className="slider__title">{item.title}</h2>
              <p className="slider__text">{item.text}</p>
            </animated.div>
          ))}
        </div>
        <div className="slider__controls-wrapper">
          <LPButton href={JOIN_ROUTE}>Join</LPButton>
          <div className="slider__controls">
            <button
              type="button"
              className="slider__arrow  slider__arrow--left"
              onClick={onClickLeft}
            >
              <Arrow />
            </button>
            <button
              type="button"
              className="slider__arrow"
              onClick={onClickRight}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FirstSlider = React.memo(_FirstSlider);
export default FirstSlider;
