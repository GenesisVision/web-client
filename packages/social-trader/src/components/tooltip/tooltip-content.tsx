import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import React from "react";
import styled from "styled-components";
import { $smallWidth } from "utils/style/sizes";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
  fixed?: boolean;
}

const Container = styled.div<{ small?: boolean }>`
  & ul {
    list-style-position: inside;
    padding: 0;
    margin: 0;
  }
  ${({ small }) => small && `min-width: ${$smallWidth};`};
`;

const _TooltipContent: React.FC<Props> = ({
  small,
  children,
  fixed = true
}) => {
  return (
    <PopoverContentCardBlock size={"small"} fixed={fixed}>
      <Container small={small}>{children}</Container>
    </PopoverContentCardBlock>
  );
};

export const TooltipContent = React.memo(_TooltipContent);
