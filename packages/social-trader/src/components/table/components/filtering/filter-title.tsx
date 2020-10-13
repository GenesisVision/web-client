import React from "react";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";
import { $fontSizeParagraph } from "utils/style/sizes";
import { fontSize } from "utils/style/style-mixins";

export const FilterTitle = styled.div`
  ${fontSize($fontSizeParagraph)};
  font-weight: 600;
  color: ${$mainColor};
`;
