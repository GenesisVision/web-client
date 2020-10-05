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

import styles from "./first-slider.module.scss";

interface Props {
  slidesItems: TSlide[];
}

const _FirstSlider: React.FC<Props> = ({ slidesItems }) => {
  const { t } = useTranslation();
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
    <SliderMainWrapper>
      <SliderImgWrapper>
        <div className={styles["slider__img-animate"]}>
          <SliderImg item={slidesItems[index]} />
        </div>
      </SliderImgWrapper>
      <SliderInfoWrapper>
        <SliderInfo>
          <div className={styles["slider__info-animate"]}>
            <SliderTitle>{t(slidesItems[index].title)}</SliderTitle>
            <SliderText>{t(slidesItems[index].text)}</SliderText>
          </div>
        </SliderInfo>
        <SliderControlsWrapper>
          {slidesItems[index].link ? (
            <JoinButton href={slidesItems[index].link}>
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
