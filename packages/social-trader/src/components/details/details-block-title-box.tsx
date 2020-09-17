import { detailsBlockHorizontalPaddings } from "components/details/details.constants";
import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const StyledDiv = styled.div`
  ${detailsBlockHorizontalPaddings}
`;

const DetailsBlockTitleBox: React.FC<Props> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default DetailsBlockTitleBox;
