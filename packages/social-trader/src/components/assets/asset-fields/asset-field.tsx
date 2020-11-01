import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";
import styled from "styled-components";

interface Props {
  hide?: boolean;
  wide?: boolean;
}

export const StyledRowItem = styled(RowItem)`
  position: relative;
  min-width: 230px;
`;

export const AssetField: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ children, wide, hide }) => {
  return (
    <StyledRowItem size={"large"} hide={hide} wide={wide} bottomOffset>
      {children}
    </StyledRowItem>
  );
};

export const StyledCenter = styled(Center)`
  max-width: 700px;
`;

export const AssetFields: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <StyledCenter wrap>{children}</StyledCenter>;

export default AssetField;
