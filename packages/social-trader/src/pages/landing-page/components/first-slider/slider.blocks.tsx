import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import { TSlide } from "pages/landing-page/static-data/slides";
import React from "react";
import { useTranslation } from "react-i18next";

const _SliderImg: React.FC<ISliderImgProps> = ({ item, animation }) => {
  const { t } = useTranslation();
  return animation ? (
    <>
      {item.iframe && <iframe className="slider__iframe" src={item.iframe} />}
      {item.imageBg && (
        <ImageBaseElement
          src={item.imageBg}
          alt={t(item.title)}
          title={t(item.title)}
          className="slider__img slider__img--animation-bg"
        />
      )}
      {item.images &&
        item.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={t(item.title)}
            title={t(item.title)}
            style={{ animationDelay: `${500 * index + 500}ms` }}
            className="slider__img slider__img--animation"
          />
        ))}
    </>
  ) : (
    <ImageBaseElement
      src={item.imageOptimization}
      alt={t(item.title)}
      title={t(item.title)}
      className="slider__img"
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
  return <p className="slider__text">{children}</p>;
});

export const SliderImgWrapper: React.FC = ({ children }) => {
  return <div className="slider__img-wrapper">{children}</div>;
};

export const SliderInfoWrapper: React.FC = ({ children }) => {
  return <div className="slider__info-wrapper">{children}</div>;
};

export const SliderInfo: React.FC = ({ children }) => {
  return <div className="slider__info">{children}</div>;
};

export const SliderControlsWrapper: React.FC = ({ children }) => {
  return <div className="slider__controls-wrapper">{children}</div>;
};

export const SliderControls: React.FC<{
  onClickLeft: VoidFunction;
  onClickRight: VoidFunction;
}> = ({ onClickLeft, onClickRight }) => {
  return (
    <div className="slider__controls">
      <button
        aria-label="Left"
        type="button"
        className="slider__arrow  slider__arrow--left"
        onClick={onClickLeft}
      >
        <Arrow />
      </button>
      <button
        aria-label="Right"
        type="button"
        className="slider__arrow"
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
  return <div className={classNames("slider", className)}>{children}</div>;
};
