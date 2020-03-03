import "./fund-assets-list.scss";

import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

const _FundAssetList: React.FC<Props> = ({ values }) => (
  <Row wrap small>
    {values.map((item: FundAssetPartWithIcon) => (
      <RowItem key={item.name}>
        <Row>
          <RowItem>
            <div
              className="fund-asset-list__bubble"
              style={{ background: item.color }}
            />
          </RowItem>
          <RowItem small>
            <MutedText small>
              {item.name} {item.percent} %
            </MutedText>
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
