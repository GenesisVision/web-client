import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  $fontSizeCommon,
  $fontSizeSmall,
  $paddingXsmall
} from "utils/style/sizes";
import { Clickable } from "utils/types";

interface Props extends Clickable {
  backPath?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: stretch;
  font-size: ${$fontSizeSmall}px;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.4;
  }
`;

const Arrow = styled.div`
  border: 1px solid transparent;
  margin-right: 5px;
  height: 16.5px;
  font-family: "Times New Roman", serif;
`;

const Text = styled.div`
  font-weight: 600;
  line-height: 5px;
  padding-top: 6.5px;
`;

const Path = styled.div`
  padding-left: ${$paddingXsmall}px;
  opacity: 0.4;
  font-size: ${$fontSizeCommon}px;
`;

export const _BackButtonBody: React.FC<Props> = ({ onClick, backPath }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Button onClick={onClick}>
        <Arrow>&larr;</Arrow>
        <Text>{t("buttons.back")}</Text>
      </Button>
      <Path>{backPath}</Path>
    </Container>
  );
};

const BackButtonBody = React.memo(_BackButtonBody);
export default BackButtonBody;
