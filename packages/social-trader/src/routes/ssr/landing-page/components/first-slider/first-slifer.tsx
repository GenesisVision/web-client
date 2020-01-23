import "./first-slider.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import React, { useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TSlides } from "routes/ssr/landing-page/static-data/slides";

import { Arrow } from "../common-icons/arrow";

interface Props {
  className?: string;
  slidesItems: TSlides[];
}

const _FirstSlider: React.FC<Props> = ({ className, slidesItems }) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slidesItems[index], item => item.id, {
    initial: { opacity: 1, position: "static" },
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
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
            style={props as any}
          >
            {item.imageBg && (
              <img
                src={item.imageBg}
                alt={item.title}
                title={item.title}
                className="slider__img slider__img--bg"
              />
            )}
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={item.title}
                title={item.title}
                style={{ animationDelay: `${500 * index + 500}ms` }}
                className="slider__img"
              />
            ))}
          </animated.div>
        ))}
      </div>
      <div className="slider__info-wrapper">
        <div className="slider__info">
          {transitions.map(({ item, props, key }) => (
            <animated.div
              className="slider__info-animate"
              key={key}
              style={props as any}
            >
              <animated.h2 className="slider__title">{item.title}</animated.h2>
              <animated.p className="slider__text">{item.text}</animated.p>
            </animated.div>
          ))}
        </div>
        <div className="slider__controls-wrapper">
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props as any}>
              <LPButton href={item.link}>Join</LPButton>
            </animated.div>
          ))}
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
