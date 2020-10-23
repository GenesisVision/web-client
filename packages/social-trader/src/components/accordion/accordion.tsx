import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { $backgroundColor } from "utils/style/colors";

interface Props {
  label: string | JSX.Element;
  text: string | JSX.Element;
}

const Container = styled(DefaultBlock)`
  cursor: pointer;
  background: ${$backgroundColor};
`;

const IconContainer = styled(Center)<{ open?: boolean }>`
  ${({ open }) => open && "transform: scale(1, -1);"};
`;

export const Accordion: React.FC<Props> = ({ label, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickLabel = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const handleClickText = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <Container wide size={"small"}>
      <Row onClick={handleClickLabel}>
        <RowItem size={"small"}>
          <IconContainer open={isOpen}>
            <FilterArrowIcon isOpen={isOpen} />
          </IconContainer>
        </RowItem>
        <RowItem>{label}</RowItem>
      </Row>
      {isOpen && (
        <Row size={"small"} onClick={handleClickText}>
          {text}
        </Row>
      )}
    </Container>
  );
};
