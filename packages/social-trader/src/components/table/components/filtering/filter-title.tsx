import React from "react";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";

export const FilterTitle = styled.div`
  ${fontSize($fontSizeParagraph)};
  font-weight: 600;
  color: ${$mainColor};
`;
