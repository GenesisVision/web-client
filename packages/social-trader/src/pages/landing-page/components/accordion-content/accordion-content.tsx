import React, { RefObject } from "react";
import styled from "styled-components";
import { $rowColor } from "utils/style/colors";
import { mediaBreakpointDesktop } from "utils/style/media";

interface Props {
  refProp?: RefObject<any>;
  isVisible?: boolean;
}

const Content = styled.div`
  border-top: 1px solid ${$rowColor}4d;
  padding: 10px 20px;
  ${mediaBreakpointDesktop("padding: 15px 25px;")}
  p:last-child {
    margin-bottom: 0;
  }
`;

const AccordionContent: React.FC<Props> = ({
  refProp,
  isVisible,
  children
}) => {
  return isVisible ? <Content ref={refProp}>{children}</Content> : null;
};

export default AccordionContent;
