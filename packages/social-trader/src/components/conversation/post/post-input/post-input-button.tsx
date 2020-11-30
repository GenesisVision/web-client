import React from "react";
import styled from "styled-components";
import { Childrenable, Clickable, Sizeable } from "utils/types";

interface Props extends Sizeable, Clickable, Childrenable {}

const _PostInputButton = styled.div<Props>`
  cursor: pointer;
  & > img,
  & > svg {
    width: 100%;
    height: 100%;
  }
  width: ${({ size = "middle" }) => {
    switch (size) {
      case "small":
        return "20px";
      case "middle":
        return "30px";
    }
  }};
  height: ${({ size = "middle" }) => {
    switch (size) {
      case "small":
        return "20px";
      case "middle":
        return "30px";
    }
  }};
`;

export const PostInputButton = React.memo(_PostInputButton);
