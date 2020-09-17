import { $mainColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeParagraph } from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/style-mixins";

export const FilterTitle = styled.div`
  ${fontSize($fontSizeParagraph)};
  font-weight: 600;
  color: ${$mainColor};
`;
