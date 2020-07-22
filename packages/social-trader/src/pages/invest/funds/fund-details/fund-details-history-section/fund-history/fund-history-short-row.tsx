import { Center } from "components/center/center";
import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React from "react";
import { formatDate } from "utils/dates";

import styles from "./fund-history.module.scss";

interface Props {
  setOpen: VoidFunction;
  item: IFundHistoryDataItem;
}

const _FundHistoryShortRow: React.FC<Props> = ({ setOpen, item }) => {
  return (
    <TableRow onClick={setOpen} className={styles["fund-history__short-row"]}>
      <TableCell>{formatDate(item.date)}</TableCell>
      <TableCell>{formatDate(item.date)}</TableCell>
      <TableCell>
        <Center>
          <RowItem wide>
            <FundAssetContainer
              noWrap
              assets={item.parts}
              type={FUND_ASSET_TYPE.SHORT}
              size={13}
              length={item.parts.length}
              hasPopoverList
            />
          </RowItem>
        </Center>
      </TableCell>
    </TableRow>
  );
};

const FundHistoryShortRow = React.memo(_FundHistoryShortRow);
export default FundHistoryShortRow;
