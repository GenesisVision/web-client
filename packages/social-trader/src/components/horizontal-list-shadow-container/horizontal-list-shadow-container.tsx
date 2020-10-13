import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  leftDarkShadow,
  leftShadow,
  rightDarkShadow,
  rightShadow
} from "utils/style/shadow";

export type ScrollDataType = {
  scroll: number;
  endOfList: number;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  scrollData: ScrollDataType;
  darkShadow?: boolean;
}

const inBefore = (style: string) => `&:before {${style}}`;
const inAfter = (style: string) => `&:after {${style}}`;

const Container = styled.div<{
  right?: boolean;
  left?: boolean;
  dark?: boolean;
}>`
  display: flex;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  ${({ right, left, dark }) => {
    if (right) return inAfter(dark ? rightDarkShadow() : rightShadow());
    if (left) return inBefore(dark ? leftDarkShadow() : leftShadow());
  }};
`;

export const HorizontalListShadowContainer: React.FC<Props> = ({
  scrollData: { scroll, endOfList },
  darkShadow,
  children
}) => {
  const [leftShadow, setLeftShadow] = useState<boolean>(false);
  const [rightShadow, setRightShadow] = useState<boolean>(false);
  useEffect(() => {
    if (scroll > 0) setLeftShadow(true);
    if (scroll === 0) setLeftShadow(false);
    if (scroll < endOfList) setRightShadow(true);
    if (scroll >= endOfList) setRightShadow(false);
  }, [scroll, endOfList]);
  return (
    <Container right={rightShadow} left={leftShadow} dark={darkShadow}>
      {children}
    </Container>
  );
};
