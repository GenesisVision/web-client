import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";
import { $tableBackgroundSubColor } from "utils/style/colors";
import {
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet
} from "utils/style/media";

interface IManagerHistoryItemProps {
  label: string;
}

export const ManagerHistoryChartContainer = styled(RowItem)`
  max-width: 120px;
  width: 120px;
`;

export const ManagerHistoryRowContainer = styled.tr`
  &:nth-child(2n + 1) {
    background: ${$tableBackgroundSubColor};
  }
`;

export const ManagerHistoryRowData = styled(Row)`
  justify-content: space-between;
  flex-wrap: wrap;
  ${mediaBreakpointLandscapeTablet("flex-wrap: nowrap;")}
`;

export const ManagerHistoryItem: React.FC<IManagerHistoryItemProps> = React.memo(
  ({ label, children }) => {
    return (
      <RowItem size={"xlarge"} bottomOffset>
        <LabeledValue label={label}>
          <Text wrap={false}>{children}</Text>
        </LabeledValue>
      </RowItem>
    );
  }
);

export const ManagerHistoryFavoriteIcon = styled(RowItem)`
  width: 20px;
  height: 19px;
  ${mediaBreakpointLandscapePhone(`
    width: 28px;
    height: 27px;
  `)}
`;
