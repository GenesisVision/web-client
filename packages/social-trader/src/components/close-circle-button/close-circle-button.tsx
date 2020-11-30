import { CloseIcon } from "components/icon/close-icon";
import React from "react";
import styled from "styled-components";
import { transition } from "utils/style/mixins";
import { $boxShadow4 } from "utils/style/shadow";
import { Clickable } from "utils/types";

interface Props extends Clickable {}

const Container = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #293842;
  border-radius: 50%;
  ${transition("background-color")};
  box-shadow: ${$boxShadow4};
  &:hover:not(:disabled) {
    background-color: #161b20;
  }
`;

const Icon = styled.div`
  width: 8px;
  height: 8px;
`;

const _CloseCircleButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Icon>
        <CloseIcon />
      </Icon>
    </Container>
  );
};

export const CloseCircleButton = React.memo(_CloseCircleButton);
