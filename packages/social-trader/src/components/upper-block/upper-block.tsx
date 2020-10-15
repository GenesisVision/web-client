import { UpperButtonArrow } from "components/upper-button/upper-button";
import React, { useCallback } from "react";
import styled from "styled-components";
import { transition } from "utils/style/mixins";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background: rgba(255, 255, 255, 0.005);
  ${transition("opacity")};

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const UpperBlock: React.FC = () => {
  const handleClick = useCallback(() => {
    window.scroll({ top: 0 });
  }, []);
  return (
    <Container onClick={handleClick}>
      <UpperButtonArrow>&uarr;</UpperButtonArrow>
    </Container>
  );
};
