import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import { TSlide } from "pages/landing-page/static-data/slides";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./first-slider.module.scss";

const _SliderImg: React.FC<ISliderImgProps> = ({ item, animation }) => {
  const { t } = useTranslation();
  return animation ? (
    <>
      {item.imageBg && (
        <ImageBaseElement
          src={item.imageBg}
          alt={t(item.title)}
          title={t(item.title)}
          className={classNames(
            styles["slider__img"],
            styles["slider__img--animation-bg"]
          )}
        />
      )}
      {item.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={t(item.title)}
          title={t(item.title)}
          style={{ animationDelay: `${500 * index + 500}ms` }}
          className={classNames(
            styles["slider__img"],
            styles["slider__img--animation"]
          )}
        />
      ))}
    </>
  ) : (
    <ImageBaseElement
      src={item.imageOptimization}
      alt={t(item.title)}
      title={t(item.title)}
      className={styles["slider__img"]}
    />
  );
};

interface ISliderImgProps {
  item: TSlide;
  animation?: boolean;
}
export const SliderImg = React.memo(_SliderImg);

export const SliderTitle: React.FC = React.memo(({ children }) => {
  return <h2>{children}</h2>;
});

export const SliderText: React.FC = React.memo(({ children }) => {
  return <p className={styles["slider__text"]}>{children}</p>;
});

export const SliderImgWrapper: React.FC = ({ children }) => {
  return <div className={styles["slider__img-wrapper"]}>{children}</div>;
};

export const SliderInfoWrapper: React.FC = ({ children }) => {
  return <div className={styles["slider__info-wrapper"]}>{children}</div>;
};

export const SliderInfo: React.FC = ({ children }) => {
  return <div className={styles["slider__info"]}>{children}</div>;
};

export const SliderControlsWrapper: React.FC = ({ children }) => {
  return <div className={styles["slider__controls-wrapper"]}>{children}</div>;
};

export const SliderControls: React.FC<{
  onClickLeft: VoidFunction;
  onClickRight: VoidFunction;
}> = ({ onClickLeft, onClickRight }) => {
  return (
    <div className={styles["slider__controls"]}>
      <button
        aria-label="Left"
        type="button"
        className={classNames(
          styles["slider__arrow"],
          styles["slider__arrow--left"]
        )}
        onClick={onClickLeft}
      >
        <Arrow />
      </button>
      <button
        aria-label="Right"
        type="button"
        className={styles["slider__arrow"]}
        onClick={onClickRight}
      >
        <Arrow />
      </button>
    </div>
  );
};

export const SliderMainWrapper: React.FC<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={classNames(styles["slider"], className)}>{children}</div>
  );
};
