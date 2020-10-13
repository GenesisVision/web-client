import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import EventListener from "react-event-listener";
import styled from "styled-components";
import { transition } from "utils/style/mixins";

export const UpperButtonContainer: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const debouncedSetScrollFunc = useCallback(
    debounce(() => setScrollTop(window.scrollY), 300),
    []
  );
  const handleScroll = useCallback(() => debouncedSetScrollFunc(), []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setScrollTop(window.scrollY);
  }, []);

  useEffect(() => {
    if (scrollTop > windowHeight) setVisible(true);
    else setVisible(false);
  }, [scrollTop]);

  return (
    <>
      <EventListener target={"window"} onScroll={handleScroll} />
      <UpperButton visible={visible} />
    </>
  );
};

interface IUpperButtonProps {
  visible?: boolean;
}

const BUTTON_SIZE = 60;

const Button = styled.div<IUpperButtonProps>`
  position: fixed;
  bottom: ${BUTTON_SIZE}px;
  right: ${BUTTON_SIZE}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  opacity: ${({ visible }) => (visible ? 0.5 : 0)};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  ${transition("opacity")};

  &:hover {
    opacity: 1;
  }
`;

export const UpperButtonArrow = styled.div`
  font-size: 40px;
  line-height: 1;
  font-weight: bolder;
`;

export const UpperButton: React.FC<IUpperButtonProps> = ({ visible }) => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <>
      <Button onClick={handleClick} visible={visible}>
        <UpperButtonArrow>&uarr;</UpperButtonArrow>
      </Button>
    </>
  );
};
