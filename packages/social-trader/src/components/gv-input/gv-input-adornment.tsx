import React from "react";
import styled from "styled-components";

interface Props {
  adornmentPosition?: "start" | "end";
}

export const GvInputAdornment = styled.div<Props>`
  display: flex;
  max-height: 2em;
  align-items: center;
  ${({ adornmentPosition = "end" }: Props) => {
    switch (adornmentPosition) {
      case "end":
        return `
          order: 2;
          margin-left: 8px;
      `;
      case "start":
        return `
          order: 0;
          margin-right: 8px;
      `;
    }
  }}
`;
