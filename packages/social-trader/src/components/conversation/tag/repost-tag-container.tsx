import { $borderColor } from "components/gv-styles/gv-colors/gv-colors";
import { $paddingXsmall } from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";

export const RepostTagContainer = styled.div`
  padding-left: ${$paddingXsmall}px;
  border-left: 1px solid ${$borderColor};
`;
