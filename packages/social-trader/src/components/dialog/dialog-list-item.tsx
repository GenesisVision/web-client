import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";
import { Sizeable } from "utils/types";

const StyledRow = styled(Row)`
  ${fontSize($fontSizeParagraph)};
  font-weight: 400;
  justify-content: space-between;
`;

export const _DialogListItem: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ label, children, size }) => (
  <StyledRow size={size}>
    <Text muted>{label}</Text>
    <span>{children}</span>
  </StyledRow>
);

interface Props extends Sizeable {
  label: string;
}

export const DialogListItem = React.memo(_DialogListItem);
