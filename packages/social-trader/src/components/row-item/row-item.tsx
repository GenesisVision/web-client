import { RowItemDynamicStyles } from "components/row-item/row-item.style";
import { IRowItemProps } from "components/row-item/row-item.types";
import React from "react";
import styled from "styled-components";

export const RowItem = styled.div<IRowItemProps>`
  box-sizing: border-box;
  ${RowItemDynamicStyles}
`;
