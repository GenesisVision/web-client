import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";

const StyledLink = styled(Link)`
  ${fontSize($fontSizeParagraph)};
  font-weight: 600;
`;

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => {
  const { linkCreator } = useToLink();
  return (
    <RowItem>
      <StyledLink to={linkCreator(route, route)}>{text}</StyledLink>
    </RowItem>
  );
});
