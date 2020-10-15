import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";

const StyledRow = styled(Row)`
  ${fontSize($fontSizeParagraph)};
  font-weight: 400;
  justify-content: space-between;
`;

export const _DialogListItem: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ label, children }) => (
  <StyledRow>
    <Text muted>{label}</Text>
    <span>{children}</span>
  </StyledRow>
);

interface Props {
  label: string;
}

export const DialogListItem = React.memo(_DialogListItem);
