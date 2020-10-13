import useApiRequest from "hooks/api-request.hook";
import React from "react";
import styled from "styled-components";
import { horizontalPaddings, verticalPaddings } from "utils/style/mixins";
import { $paddingBig, $paddingLarge } from "utils/style/sizes";

import Active from "./active";
import { fetchActive, getActiveLoaderData } from "./service/active.service";

interface Props {
  active: string;
}

const Container = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  ${verticalPaddings($paddingBig)};
  ${horizontalPaddings($paddingLarge)};
`;

const _ActivePopupContainer: React.FC<Props> = ({ active }) => {
  const { data } = useApiRequest({
    request: () => fetchActive({ active }),
    fetchOnMount: true
  });
  return (
    <Container>
      <Active loaderData={getActiveLoaderData} data={data!} />
    </Container>
  );
};

const ActivePopupContainer = React.memo(_ActivePopupContainer);
export default ActivePopupContainer;
