import "./first-slider.scss";

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
import { TSlide } from "pages/landing-page/static-data/slides";
import React, { useCallback, useState } from "react";

interface Props {
  className?: string;
  slidesItems: TSlide[];
}

const _FirstSlider: React.FC<Props> = ({ className, slidesItems }) => {
  const [index, setIndex] = useState(0);
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
    <SliderMainWrapper className={className}>
      <SliderImgWrapper>
        <div className="slider__img-animate">
          <SliderImg item={slidesItems[index]} />
        </div>
      </SliderImgWrapper>
      <SliderInfoWrapper>
        <SliderInfo>
          <div className="slider__info-animate">
            <SliderTitle>{slidesItems[index].title}</SliderTitle>
            <SliderText>{slidesItems[index].text}</SliderText>
          </div>
        </SliderInfo>
        <SliderControlsWrapper>
          <JoinButton href={slidesItems[index].link}>Join</JoinButton>
          <SliderControls
            onClickLeft={onClickLeft}
            onClickRight={onClickRight}
          />
        </SliderControlsWrapper>
      </SliderInfoWrapper>
    </SliderMainWrapper>
  );
};

const FirstSlider = React.memo(_FirstSlider);
export default FirstSlider;
