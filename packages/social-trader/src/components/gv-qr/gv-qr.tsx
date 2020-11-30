import QRCode from "qrcode.react";
import * as React from "react";
import styled from "styled-components";
import { $backgroundColor } from "utils/style/colors";

interface IGVqr {
  value: number | string;
  size?: number;
  figureColor?: string;
  backgroundColor?: string;
}

const PADDING_SIZE = 2;

const Container = styled.div<{
  size?: number;
  backgroundColor?: string;
}>`
  display: inline-flex;
  padding: ${PADDING_SIZE}px;
  background: ${({ backgroundColor = "white" }) => backgroundColor};
  width: ${({ size = 180 }) => size + PADDING_SIZE * 2}px;
  height: ${({ size = 180 }) => size + PADDING_SIZE * 2}px;
`;

const GVqr: React.FC<IGVqr> = ({
  value,
  size = 180,
  figureColor = $backgroundColor,
  backgroundColor = "white"
}) => (
  <Container size={size} backgroundColor={backgroundColor}>
    {value ? (
      <QRCode
        value={value.toString()}
        bgColor={backgroundColor}
        fgColor={figureColor}
        size={size}
      />
    ) : null}
  </Container>
);

export default GVqr;
