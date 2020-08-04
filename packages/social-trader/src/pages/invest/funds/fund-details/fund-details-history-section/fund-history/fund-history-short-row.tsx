import ImageBase from "components/avatar/image-base";
import { Center } from "components/center/center";
import ShortArrow from "components/icon/short-arrow/short-arrow";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import SocialLink from "media/social-link.svg";
import { FundHistoryDescription } from "pages/invest/funds/fund-details/fund-details-history-section/fund-history/fund-history-description";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React from "react";
import { formatDate } from "utils/dates";

import styles from "./fund-history.module.scss";

interface Props {
  isOpen: boolean;
  setOpen: VoidFunction;
  item: IFundHistoryDataItem;
}

const _FundHistoryShortRow: React.FC<Props> = ({ isOpen, setOpen, item }) => {
  return (
    <TableRow onClick={setOpen} className={styles["fund-history__short-row"]}>
      <TableCell>{formatDate(item.date)}</TableCell>
      <TableCell>
        <Center>
          <RowItem
            size={"small"}
            className={styles["fund-history__event-logo-icon"]}
          >
            <ImageBase
              src={item.logoUrl}
              alt={item.type}
              defaultImage={SocialLink}
            />
          </RowItem>
          <RowItem> {item.type}</RowItem>
        </Center>
      </TableCell>
      <TableCell>
        <Center>
          <RowItem wide>
            <FundHistoryDescription
              description={item.description}
              assets={item.newAssets}
              type={item.type}
            />
          </RowItem>
          <RowItem className={styles["fund-history__expand-icon"]}>
            <ShortArrow direction={isOpen ? "top" : "bottom"} />
          </RowItem>
        </Center>
      </TableCell>
    </TableRow>
  );
};

const FundHistoryShortRow = React.memo(_FundHistoryShortRow);
export default FundHistoryShortRow;
