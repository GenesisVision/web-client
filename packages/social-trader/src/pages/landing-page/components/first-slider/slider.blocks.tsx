import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import { TSlide } from "pages/landing-page/static-data/slides";
import React from "react";

const _SliderImg: React.FC<ISliderImgProps> = ({ item }) => {
  return (
    <>
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
    </>
  );
};
interface ISliderImgProps {
  item: TSlide;
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
        type="button"
        className="slider__arrow  slider__arrow--left"
        onClick={onClickLeft}
      >
        <Arrow />
      </button>
      <button type="button" className="slider__arrow" onClick={onClickRight}>
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
