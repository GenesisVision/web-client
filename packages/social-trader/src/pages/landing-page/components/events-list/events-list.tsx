import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "components/gv-styles/gv-media";
import { PlatformEvent } from "gv-api-web";
import EventItem from "pages/landing-page/components/events-list/event-item";
import EventLastItem from "pages/landing-page/components/events-list/event-last-item";
import { resetList } from "pages/landing-page/styles/landing-styles";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const TIME_DELAY = 5000;
const COUNT_SHOWING_ITEMS = 5;

interface Props {
  className?: string;
  events: PlatformEvent[];
}

const StyledUl = styled.ul<{ height: number }>`
  ${mediaBreakpointTablet("grid-column: 3/11;")}
  ${mediaBreakpointLandscapeTablet("grid-column: 4/10;")}
  ${resetList}
  position: relative;
  min-height: 600px;
  height: ${({ height }) => height}px;
`;

const _EventsList: React.FC<Props> = ({ className, events }) => {
  const countItems = events.length;
  const [startIndex, setStartIndex] = useState(0);
  const [minHeightItem, setMinHeightItem] = useState(0);
  const [heightList, setHeightList] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(state => (state === 0 ? countItems - 1 : state - 1));
    }, TIME_DELAY);

    return () => clearInterval(interval);
  }, []);
  const updateMinHeight = useCallback(
    (currentHeight: number) => {
      setMinHeightItem(state =>
        state < currentHeight ? currentHeight : state
      );
      setHeightList((minHeightItem + 20) * (COUNT_SHOWING_ITEMS + 1));
    },
    [minHeightItem, heightList]
  );

  useEffect(() => {
    setHeightList((minHeightItem + 20) * (COUNT_SHOWING_ITEMS + 1));
  }, [minHeightItem, heightList]);

  return (
    <StyledUl height={heightList}>
      {events.map((event, index) => (
        <EventItem
          key={index}
          startIndex={startIndex}
          countItems={countItems}
          countShowingItems={COUNT_SHOWING_ITEMS}
          index={index}
          minHeight={minHeightItem}
          updateMinHeight={updateMinHeight}
          {...event}
        />
      ))}
      <EventLastItem minHeight={minHeightItem} />
    </StyledUl>
  );
};

const EventsList = React.memo(_EventsList);
export default EventsList;
