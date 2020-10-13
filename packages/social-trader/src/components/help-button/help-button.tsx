import * as React from "react";
import styled from "styled-components";
import { $iconColor, $labelColor } from "utils/style/colors";
import { OptionalClickable } from "utils/types";

interface Props extends OptionalClickable {
  muted?: boolean;
  className?: string;
}

const StyledDiv = styled.div<{ muted?: boolean }>`
  background: none;
  padding: 0;
  box-sizing: border-box;
  width: 15px;
  height: 15px;
  border: 1px solid ${$iconColor};
  border-radius: 50%;
  line-height: 15px;
  text-align: center;
  font-size: 8px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  border-color: ${({ muted }: Props) => (muted ? $labelColor : $iconColor)};
  color: ${({ muted }: Props) => (muted ? $labelColor : $iconColor)};
`;

const HelpButton: React.FC<Props> = ({ muted, onClick }) => {
  return (
    <StyledDiv muted={muted} onClick={onClick}>
      ?
    </StyledDiv>
  );
};

export default HelpButton;
