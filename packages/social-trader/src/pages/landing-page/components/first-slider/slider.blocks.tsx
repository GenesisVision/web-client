import ImageBaseElement from "components/avatar/image-base.element";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import { TSlide } from "pages/landing-page/static-data/slides";
import { grid, resetButton } from "pages/landing-page/styles/landing-styles";
import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css, keyframes } from "styled-components";
import { $landingBgGray, $mainColor, $primaryColor } from "utils/style/colors";
import { getHEXA } from "utils/style/generators";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

interface ISliderImgProps {
  item: TSlide;
  animation?: boolean;
}

const slideLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-30%, -50%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
`;

const appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const sliderImgStyle = css`
  max-height: 100%;
  vertical-align: middle;
  position: absolute;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const BackgroundImg = styled(ImageBaseElement)`
  ${sliderImgStyle};
  opacity: 0;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 0.7s;
  animation-name: ${appear};
`;

const AnimationImg = styled.img<{ index: number }>`
  ${sliderImgStyle};
  transform: translate3d(-30%, -50%, 0);
  opacity: 0;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: ${slideLeft};
  animation-delay: ${({ index }) => `${500 * index + 500}ms`};
`;

const DefaultSliderImg = styled(ImageBaseElement)`
  ${sliderImgStyle};
`;

const _SliderImg: React.FC<ISliderImgProps> = ({ item, animation }) => {
  const { t } = useTranslation();
  return animation ? (
    <>
      {item.imageBg && (
        <BackgroundImg
          src={item.imageBg}
          alt={t(item.title)}
          title={t(item.title)}
        />
      )}
      {item.images.map((image, index) => (
        <AnimationImg
          index={index}
          key={index}
          src={image}
          alt={t(item.title)}
          title={t(item.title)}
        />
      ))}
    </>
  ) : (
    <DefaultSliderImg
      src={item.imageOptimization}
      alt={t(item.title)}
      title={t(item.title)}
    />
  );
};

export const SliderImg = React.memo(_SliderImg);

export const SliderTitle: React.FC = ({ children }) => {
  return <h2>{children}</h2>;
};

export const SliderText = styled.p`
  font-weight: 500;
  color: ${getHEXA($landingBgGray, 0.5)};
`;

export const SliderImgWrapper = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  ${mediaBreakpointTablet(`
    height: 360px;
    margin-bottom: 60px;
    grid-column: 2/12;
  `)}
  ${mediaBreakpointLandscapeTablet(`
    height: 380px;
    margin-bottom: 0;
    grid-column: 6/12;
    order: 2;
  `)}
  ${mediaBreakpointDesktop(`
    height: 450px;
    grid-column: 6/13;
  `)}
  ${mediaBreakpointLargeDesktop("height: 600px;")}
`;

export const SliderInfoWrapper = styled.div`
  ${mediaBreakpointTablet("grid-column: 2/12;")}
  ${mediaBreakpointLandscapeTablet("grid-column: 2/6; order: 1;")}
`;

export const SliderInfo = styled.div`
  position: relative;
  min-height: 185px;
  ${mediaBreakpointTablet("min-height: 170px;")}
  ${mediaBreakpointDesktop("min-height: 200px;")}
`;

export const SliderControlsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  margin-top: 20px;
  ${mediaBreakpointTablet("margin-top: 40px;")}
  ${mediaBreakpointLandscapeTablet("grid-auto-flow: row; grid-gap: 40px;")}
`;

export const SliderArrow = styled.button`
  ${transition("background-color", "border-color")};
  ${resetButton};
  border: 1px solid ${$mainColor}1A;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  stroke: ${$mainColor};
  mix-blend-mode: normal;
  margin-right: 30px;
  svg {
    ${transition("stroke")};
    width: 6px;
    height: 10px;
  }
  &:hover {
    border-color: ${getHEXA($mainColor, 0.2)};
    stroke: ${$primaryColor};
  }
  &:active {
    stroke: ${$primaryColor};
  }
  ${mediaBreakpointLargeDesktop("width: 50px; height: 50px;")}
`;

export const SliderArrowLeft = styled(SliderArrow)`
  svg {
    transform: rotate(-180deg);
  }
`;

export const SliderControls: React.FC<{
  onClickLeft: VoidFunction;
  onClickRight: VoidFunction;
}> = ({ onClickLeft, onClickRight }) => {
  return (
    <div>
      <SliderArrowLeft aria-label="Left" type="button" onClick={onClickLeft}>
        <Arrow />
      </SliderArrowLeft>
      <SliderArrow aria-label="Right" type="button" onClick={onClickRight}>
        <Arrow />
      </SliderArrow>
    </div>
  );
};

export const SliderMainWrapper = styled.div`
  ${grid};
  align-items: center;
  margin-bottom: 60px;
  ${mediaBreakpointLandscapeTablet("margin-bottom: 0;")}
`;
