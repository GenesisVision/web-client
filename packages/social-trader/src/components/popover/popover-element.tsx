import styled from "styled-components";
import { $popoverBackground } from "utils/style/colors";
import { adaptiveBorderRadius } from "utils/style/mixins";
import { $boxShadow4 } from "utils/style/shadow";
import { $borderRadius } from "utils/style/sizes";

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
