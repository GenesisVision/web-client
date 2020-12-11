import React from "react";
import styled from "styled-components";
import { $borderColor } from "utils/style/colors";
import { $paddingXsmall } from "utils/style/sizes";

export const RepostTagContainer = styled.div`
  padding-left: ${$paddingXsmall}px;
  border-left: 1px solid ${$borderColor};
`;
