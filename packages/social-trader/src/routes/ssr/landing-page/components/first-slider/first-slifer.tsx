import "./slider.scss";

import React, { useCallback, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { START_ROUTE } from "routes/ssr/landing-page/routes/nav";

import { Arrow } from "./arrow/arrow";

const slides = [
  {
    id: 0,
    title: "Pay with card",
    text:
      "Receive a 100% bonus on any deposit made on Genesis Markets. The bonus is unlocked as soon as you start trading!",
    url:
      "photo-1544511916-0148ccdeb877?ixlib=r1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i"
  },
  {
    id: 1,
    title: "Enticing invitations",
    text:
      "Receive a 100% bonus on any deposit made on Genesis Markets. The bonus is unlocked as soon as you start trading!",
    url:
      "photo-1544572571-ab94fd872ce4?ixlib=r1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80"
  }
];

const _FirstSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 220, friction: 120 }
  });
  const countsSlides = slides.length;
  const onClickLeft = useCallback(
    () => setIndex(state => (state === 0 ? countsSlides - 1 : state - 1)),
    []
  );
  const onClickRight = useCallback(
    () => setIndex(state => (state + 1) % countsSlides),
    []
  );
  return (
    <div className="slider">
      <div className="slider__container">
        <div className="slider__img">
          {transitions.map(({ item, props, key }) => (
            <animated.div
              key={key}
              className="slider__img-animate"
              style={{
                ...props,
                backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`
              }}
            />
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
          <div className="slider__controls">
            <LPButton href={START_ROUTE}>Join</LPButton>
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
