import * as React from "react";
import styled from "styled-components";
import { hideOnLandscapeTablet, transition } from "utils/style/mixins";

interface Props {
  openSearch?: boolean;
}

const NavigationContainer = styled.div`
  overflow: hidden;
  ${transition("width")}
  ${hideOnLandscapeTablet("flex")}
  width: ${({ openSearch }: Props) => (openSearch ? 0 : "100%")}
`;

export default NavigationContainer;
