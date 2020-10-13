import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { Row } from "components/row/row";
import * as React from "react";
import styled from "styled-components";
import { adaptivePadding, fontSize } from "utils/style/mixins";
import { $fontSizeCommon, $paddingXsmall } from "utils/style/sizes";

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
}

const Subtitle = styled(Row)`
  ${fontSize($fontSizeCommon)};
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #e8eff3;
`;

const Container = styled.div`
  ${adaptivePadding("top", $paddingXsmall)};
`;

export const DialogTop: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ title, subtitle, children }) => (
  <PopoverContentCardBlock dark size={"large"} fixed>
    <Container>
      {title && (
        <Row>
          <h2>{title}</h2>
        </Row>
      )}
      {subtitle && <Subtitle size={"small"}>{subtitle}</Subtitle>}
    </Container>
    {children}
  </PopoverContentCardBlock>
);
