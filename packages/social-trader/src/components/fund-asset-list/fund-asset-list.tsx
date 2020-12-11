import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";
import styled from "styled-components";

interface Props {
  values: FundAssetPartWithIcon[];
}

const Bubble = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const _FundAssetList: React.FC<Props> = ({ values }) => (
  <Row wrap size={"small"}>
    {values.map((item: FundAssetPartWithIcon) => (
      <RowItem key={item.name}>
        <Row>
          <RowItem size={"small"}>
            <Bubble color={item.color} />
          </RowItem>
          <RowItem size={"small"}>
            <Text size={"small"} muted>
              {item.name} {item.percent} %
            </Text>
          </RowItem>
        </Row>
      </RowItem>
    ))}
  </Row>
);

const FundAssetList = React.memo(_FundAssetList);
export default FundAssetList;
