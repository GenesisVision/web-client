import * as React from "react";
import styled from "styled-components";
import { transition } from "utils/style/mixins";

interface Props {
  openSearch?: boolean;
}

const SearchContainer = styled.div`
  ${transition("width")};
  width: ${({ openSearch }: Props) => (openSearch ? "100%" : "40px")};
`;

export default SearchContainer;
