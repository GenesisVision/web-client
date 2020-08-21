import GVLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import styled, { css } from "styled-components";

const styles = css`
  display: flex;
  align-items: center;
`;

const StyledRowItem = styled(RowItem)`
  ${styles}
`;
const StyledLink = styled(Link)`
  ${styles}
`;

export const GvRootItem: React.FC = () => {
  return (
    <StyledRowItem size={"large"}>
      <StyledLink to={HOME_ROUTE}>
        <GVLogo />
      </StyledLink>
    </StyledRowItem>
  );
};
