import { useTranslation } from "i18n";
import {
  SliderControls,
  SliderControlsWrapper,
  SliderImg,
  SliderImgWrapper,
  SliderInfo,
  SliderInfoWrapper,
  SliderMainWrapper,
  SliderText,
  SliderTitle
} from "pages/landing-page/components/first-slider/slider.blocks";
import { JoinButton } from "pages/landing-page/components/join-button";
import { SignupButton } from "pages/landing-page/components/signup-button/signup-button";
import { TSlide } from "pages/landing-page/static-data/slides";
import React, { useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";

interface Props {
  className?: string;
  slidesItems: TSlide[];
}

const _FirstSliderWithAnimation: React.FC<Props> = ({ slidesItems }) => {
  const { t } = useTranslation();
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
    <SliderMainWrapper>
      <SliderImgWrapper>
        {transitions.map(({ item, props: { transform, ...rest }, key }) => (
          <animated.div
            key={key}
            style={{ top: 0, left: 0, width: "100%", ...rest } as any}
          >
            <SliderImg item={item} animation />
          </animated.div>
        ))}
      </SliderImgWrapper>
      <SliderInfoWrapper>
        <SliderInfo>
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div
              key={key}
              style={{ top: 0, left: 0, width: "100%", ...rest } as any}
            >
              <animated.div style={{ transform }}>
                <SliderTitle>{t(item.title)}</SliderTitle>
              </animated.div>
              <animated.div style={{ transform }}>
                <SliderText>{t(item.text)}</SliderText>
              </animated.div>
            </animated.div>
          ))}
        </SliderInfo>
        <SliderControlsWrapper>
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div key={key} style={rest as any}>
              {item.link ? (
                <JoinButton href={item.link}>
                  {t("landing-page:buttons.join")}
                </JoinButton>
              ) : (
                <SignupButton
                  color="primary"
                  eventLabel={t("landing-page:buttons.join")}
                >
                  {t("landing-page:buttons.join")}
                </SignupButton>
              )}
            </animated.div>
          ))}
          <SliderControls
            onClickLeft={onClickLeft}
            onClickRight={onClickRight}
          />
        </SliderControlsWrapper>
      </SliderInfoWrapper>
    </SliderMainWrapper>
  );
};

const FirstSliderWithAnimation = React.memo(_FirstSliderWithAnimation);
export default FirstSliderWithAnimation;
