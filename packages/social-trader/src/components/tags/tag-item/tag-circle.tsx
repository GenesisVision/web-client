import * as React from "react";
import styled from "styled-components";

interface Props {
  backgroundColor: string;
}

const _TagCircle = styled.div<Props>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const TagCircle = React.memo(_TagCircle);
export default TagCircle;
