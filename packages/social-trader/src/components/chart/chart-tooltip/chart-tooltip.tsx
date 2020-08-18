import {
  $textLightColor,
  $tooltipBackgroundColor,
  $tooltipShadowColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeH4, $paddingXsmall } from "components/gv-styles/gv-sizes";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import { formatDate } from "utils/dates";

interface Props {
  body: JSX.Element;
  date: string | Date;
  className?: string;
  heading?: string;
}

const Container = styled.div`
  font-size: 10px;
  line-height: 1.2rem;
  padding: ${$paddingXsmall}px;
  border-radius: 0.5rem;
  background-color: ${$tooltipBackgroundColor};
  box-shadow: 5px 5px 25px 0 ${$tooltipShadowColor};
`;

const Body = styled.div`
  margin-top: 7px;
  margin-bottom: 15px;
  font-size: ${$fontSizeH4};
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${$textLightColor};
`;

const ChartTooltip: React.FC<Props> = ({ heading, body, date }) => (
  <Container>
    <Text muted>{heading}</Text>
    <Body>{body}</Body>
    <Text muted size={"small"}>
      {formatDate(date)}
    </Text>
  </Container>
);

export default React.memo(ChartTooltip);
