import { Center } from "components/center/center";
import Dialog from "components/dialog/dialog";
import { RowItem } from "components/row-item/row-item";
import styled from "styled-components";
import { horizontalPaddings, verticalPaddings } from "utils/style/mixins";
import {
  $fontSizeSmall,
  $popoverPaddingMedium,
  $popoverPaddingSmall
} from "utils/style/sizes";

export const UserPopupList = styled.div`
  max-height: 456px;
  overflow: auto;
`;

export const UserPopupDialog = styled(Dialog)`
  width: 80vh;
  max-width: 500px;
`;

export const UserPopupItem = styled(Center)`
  ${horizontalPaddings($popoverPaddingMedium)};
  ${verticalPaddings($popoverPaddingSmall)};
  &:nth-child(2n + 1) {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const UserPopupName = styled(RowItem)`
  font-size: ${$fontSizeSmall}px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
