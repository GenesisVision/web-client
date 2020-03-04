import "./first-slider.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { JoinButton } from "pages/landing-page/components/join-button";
import { TSlides } from "pages/landing-page/static-data/slides";
import React, { useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";

import { Arrow } from "../common-icons/arrow";

interface Props {
  className?: string;
  slidesItems: TSlides[];
}

const _FirstSlider: React.FC<Props> = ({ className, slidesItems }) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slidesItems[index], item => item.id, {
    initial: {
      opacity: 1,
      position: "static",
      transform: "translate3d(0,0px,0)"
    },
    from: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(0,20px,0)"
    },
    enter: {
      opacity: 1,
      position: "static",
      transform: "translate3d(0,0px,0)"
    },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(0,20px,0)"
    }
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
        {transitions.map(({ item, props: { transform, ...rest }, key }) => (
          <animated.div
            key={key}
            className="slider__img-animate"
            style={rest as any}
          >
            {item.imageBg && (
              <ImageBaseElement
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
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div
              className="slider__info-animate"
              key={key}
              style={rest as any}
            >
              <animated.h2 className="slider__title" style={{ transform }}>
                {item.title}
              </animated.h2>
              <animated.p className="slider__text" style={{ transform }}>
                {item.text}
              </animated.p>
            </animated.div>
          ))}
        </div>
        <div className="slider__controls-wrapper">
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div key={key} style={rest as any}>
              <JoinButton href={item.link}>Join</JoinButton>
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
