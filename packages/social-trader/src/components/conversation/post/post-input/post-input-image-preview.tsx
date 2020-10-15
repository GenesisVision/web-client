import ImageBaseElement from "components/avatar/image-base.element";
import { IImageValue } from "components/form/input-image/input-image";
import { CloseIcon } from "components/icon/close-icon";
import React from "react";
import styled from "styled-components";
import { pSBC } from "utils/psbc";
import { $popoverBackground } from "utils/style/colors";
import { adaptiveBorderRadius, transition } from "utils/style/mixins";
import { $borderRadius, $closeButtonSize } from "utils/style/sizes";

interface Props {
  onRemove: (id?: string) => void;
  image: IImageValue;
}

const Container = styled.div`
  position: relative;
`;

const FixedContainer = styled.div`
  max-width: 60px;
  overflow-x: hidden;
  ${adaptiveBorderRadius($borderRadius)};
`;

const Image = styled(ImageBaseElement)`
  display: block;
  height: 40px;
`;

const RemoveButton = styled.div`
  padding: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: ${$closeButtonSize}px;
  height: ${$closeButtonSize}px;
  border-radius: 50%;
  top: ${-$closeButtonSize / 2}px;
  right: ${-$closeButtonSize / 2}px;
  ${transition("background-color")};
  background-color: ${$popoverBackground};
  &:hover:not(:disabled) {
    background-color: ${pSBC(-0.3, $popoverBackground)};
  }
`;

const _PostInputImagePreview: React.FC<Props> = ({ image, onRemove }) => {
  return (
    <Container>
      <FixedContainer>
        <Image src={image.src} />
      </FixedContainer>
      <RemoveButton onClick={() => onRemove(image.id)}>
        <CloseIcon />
      </RemoveButton>
    </Container>
  );
};

export const PostInputImagePreview = React.memo(_PostInputImagePreview);
