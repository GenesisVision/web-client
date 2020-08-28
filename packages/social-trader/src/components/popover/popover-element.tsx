import { $popoverBackground } from "components/gv-styles/gv-colors/gv-colors";
import { $borderRadius } from "components/gv-styles/gv-sizes";
import { $boxShadow4 } from "components/gv-styles/gv-style-constants";
import styled from "styled-components";
import { adaptiveBorderRadius } from "utils/style/style-mixins";

export const PopoverElement = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  background-color: ${$popoverBackground};
  ${adaptiveBorderRadius($borderRadius)};
  overflow: hidden;
  box-shadow: ${$boxShadow4};
  max-width: calc(100vw - 20px);
  z-index: 1301;
  transition: opacity 150ms ease-in-out;
`;
