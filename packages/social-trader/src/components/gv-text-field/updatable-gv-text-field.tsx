import { GVTextFieldProps } from "components/gv-text-field/gv-text-field.style";
import GVTextField from "components/gv-text-field/index";
import { RefreshIcon } from "components/icon/refresh-icon";
import { debounce } from "lodash";
import React, { useCallback } from "react";
import styled from "styled-components";
import { transition } from "utils/style/mixins";

export interface IUpdatableGvTextFieldProps {
  onClickUpdate?: VoidFunction;
  Icon?: React.FC;
}
export interface Props extends GVTextFieldProps, IUpdatableGvTextFieldProps {}

const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  z-index: 10000;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 15px;
  &:hover {
    opacity: 0.4;
  }
  ${transition("opacity")}
`;

const _UpdatableGvTextField: React.FC<Props> = props => {
  const { onClickUpdate, Icon = RefreshIcon } = props;
  const update = useCallback(debounce(onClickUpdate || (() => {}), 250), []);
  const handleClick = useCallback(() => {
    update();
  }, []);
  return (
    <Container>
      {onClickUpdate && (
        <ButtonContainer onClick={handleClick}>
          <Icon />
        </ButtonContainer>
      )}
      <GVTextField {...props} />
    </Container>
  );
};

export const UpdatableGvTextField = React.memo(_UpdatableGvTextField);
