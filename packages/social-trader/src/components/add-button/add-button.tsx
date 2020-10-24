import * as React from "react";
import styled from "styled-components";
import { $textAccentColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { $dividerText } from "utils/style/sizes";

const $addButtonHeight = 25;

const Container = styled.div`
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
  color: #14beb4;
  background: rgba(21, 187, 175, 0.1);
  width: ${$addButtonHeight / $dividerText}px;
  height: ${$addButtonHeight / $dividerText}px;
  cursor: pointer;
  font-size: ${28 / $dividerText}px;
  font-weight: 200;
  &:hover {
    background: rgb(21, 187, 175);
    color: ${$textAccentColor};
  }
  ${mediaBreakpointLandscapePhone(`
    font-size: 28px;
    width: ${$addButtonHeight}px;
    height: ${$addButtonHeight}px;
  `)}
`;

const AddButton: React.FC = () => {
  return <Container>+</Container>;
};
export default AddButton;
