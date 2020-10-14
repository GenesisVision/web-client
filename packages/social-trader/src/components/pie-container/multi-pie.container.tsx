import React, { useCallback } from "react";
import styled from "styled-components";

import { MultiPie } from "./pie";

interface Props {
  setOverItem?: (name?: string) => void;
  over?: string;
  data: any[];
}

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const _MultiPieContainer: React.FC<Props> = ({ data, over, setOverItem }) => {
  const handleOver = useCallback(
    name => () => {
      setOverItem && setOverItem(name);
    },
    []
  );
  const handleLeave = useCallback(() => {
    setOverItem && setOverItem(undefined);
  }, []);
  let sum = 0;
  const dataWithBegin = data.map(item => {
    const begin = (360 / 100) * sum;
    sum += item.value;
    return { ...item, begin, end: 100 };
  });
  return (
    <Container>
      <MultiPie
        over={over}
        circles={dataWithBegin}
        onMouseOver={handleOver}
        onMouseLeave={handleLeave}
        withSubstrate={false}
      />
    </Container>
  );
};

const MultiPieContainer = React.memo(_MultiPieContainer);
export default MultiPieContainer;
