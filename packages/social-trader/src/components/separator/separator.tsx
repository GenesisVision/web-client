import React from "react";
import styled from "styled-components";

interface Props {
  direction?: "horizontal" | "vertical";
}

export const Separator = styled.div<Props>`
  ${({ direction }) => {
    switch (direction) {
      case "horizontal":
        return `
          width: 100%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      `;
      case "vertical":
        return `
          height: 100%;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
      `;
    }
  }}
`;
