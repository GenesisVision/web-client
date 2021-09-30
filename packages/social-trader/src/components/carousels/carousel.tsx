import "react-alice-carousel/lib/alice-carousel.css";

import {
  CarouselButton,
  POSITION_ARROW
} from "components/carousels/carousel.controls";
import React, { useEffect, useRef, useState } from "react";
import AliceCarousel, { EventObject, Responsive } from "react-alice-carousel";
import styled from "styled-components";

const StyledCarousel = styled.div<{
  maxWidthItem?: number;
  offsetItem?: number;
}>`
  position: relative;
  //margin-right: 15px;
  //margin-left: 30px;

  .alice-carousel__stage-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    ${({ offsetItem }) =>
      offsetItem &&
      `padding-right: ${offsetItem}px; padding-left: ${offsetItem}px;`}
    ${({ maxWidthItem }) => maxWidthItem && `max-width: ${maxWidthItem}px;`}
  }
`;

interface Props {
  items: React.ReactNode[];
  responsive?: Responsive;
  autoHeight?: boolean;
  autoWidth?: boolean;
  offsetItem?: number;
  isFlexibleItems?: boolean;
}

const _Carousel: React.FC<Props> = ({
  items,
  responsive,
  autoHeight = false,
  autoWidth = false,
  offsetItem,
  isFlexibleItems = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxWidthItem, setMaxWidthItem] = useState<number | undefined>();
  const [isShowControls, setIsShowControls] = useState(true);
  const [countItemsInSlide, setCountItemsInSlide] = useState(1);
  const [isPrevSlideDisabled, setIsPrevSlideDisabled] = useState(false);
  const [isNextSlideDisabled, setIsNextSlideDisabled] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!responsive) return;
    const windowWidth = window.innerWidth;
    const currentMediaQuery = Object.keys(responsive).find(
      (mediaQuery, index, arr) => {
        return (
          (+mediaQuery < windowWidth && index === arr.length - 1) ||
          (+arr[index + 1] > windowWidth && +mediaQuery < windowWidth)
        );
      }
    );
    if (currentMediaQuery)
      setCountItemsInSlide(responsive[currentMediaQuery].items);
  }, [responsive]);

  useEffect(() => {
    if (carouselRef.current && isFlexibleItems) {
      // @ts-ignore
      const { rootComponentDimensions } = carouselRef.current;
      if (!rootComponentDimensions.width) return;

      if (countItemsInSlide)
        setMaxWidthItem(rootComponentDimensions.width / countItemsInSlide);
    }
  }, [carouselRef, isFlexibleItems, countItemsInSlide]);

  useEffect(() => {
    if (carouselRef.current) {
      const isShowingControls = items.length > countItemsInSlide;
      setIsShowControls(isShowingControls);
      if (isShowingControls) {
        setActiveIndex(0);
        setIsPrevSlideDisabled(true);
        setIsNextSlideDisabled(false);
      }
    }
  }, [items.length, carouselRef, countItemsInSlide]);

  const slidePrev = () => {
    setActiveIndex(activeIndex - 1);
  };
  const slideNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const syncActiveIndex = (e: EventObject) => {
    setActiveIndex(e.item);
    setIsPrevSlideDisabled(e.isPrevSlideDisabled);
    setIsNextSlideDisabled(e.isNextSlideDisabled);
  };

  const setStateControls = (e: EventObject) => {
    setIsShowControls(!(e.isPrevSlideDisabled && e.isNextSlideDisabled));
    setIsPrevSlideDisabled(e.isPrevSlideDisabled);
    setIsNextSlideDisabled(e.isNextSlideDisabled);
  };

  return (
    <StyledCarousel maxWidthItem={maxWidthItem} offsetItem={offsetItem}>
      <AliceCarousel
        autoHeight={autoHeight}
        autoWidth={autoWidth}
        items={items}
        responsive={responsive}
        controlsStrategy={"responsive"}
        activeIndex={activeIndex}
        disableButtonsControls
        disableDotsControls
        onSlideChanged={syncActiveIndex}
        onInitialized={setStateControls}
        onResized={setStateControls}
        ref={carouselRef}
      />
      {isShowControls && (
        <>
          <CarouselButton
            isDisabled={isPrevSlideDisabled}
            onClick={slidePrev}
            position={POSITION_ARROW.LEFT}
          />
          <CarouselButton
            isDisabled={isNextSlideDisabled}
            onClick={slideNext}
            position={POSITION_ARROW.RIGHT}
          />
        </>
      )}
    </StyledCarousel>
  );
};

const Carousel = React.memo(_Carousel);
export default Carousel;
