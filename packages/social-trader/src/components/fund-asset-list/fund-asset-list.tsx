import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

import styles from "./fund-assets-list.module.scss";

const _FundAssetList: React.FC<Props> = ({ values }) => (
  <Row wrap size={"small"}>
    {values.map((item: FundAssetPartWithIcon) => (
      <RowItem key={item.name}>
        <Row>
          <RowItem size={"small"}>
            <div
              className={styles["fund-asset-list__bubble"]}
              style={{ background: item.color }}
            />
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

interface Props {
  values: FundAssetPartWithIcon[];
}

const FundAssetList = React.memo(_FundAssetList);
export default FundAssetList;
