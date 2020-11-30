import React from "react";
import styled from "styled-components";

interface Props {
  margin?: boolean;
  wide?: boolean;
}

export const GvInputWrapper = styled.div<Props>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  ${({ wide }: Props) => wide && "margin-left: 0; width: 100%;"};
  ${({ margin }: Props) => !margin && "margin: 0;"};
`;
