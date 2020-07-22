import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
import CollapseIcon from "components/icon/collapse-icon/collapse-icon";
import { RowItem } from "components/row-item/row-item";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { FUND_HISTORY_INNER_COLUMNS } from "pages/invest/funds/fund-details/fund-details.constants";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomInteger } from "utils/helpers";

import styles from "./fund-history.module.scss";

interface Props {
  setClose: VoidFunction;
  item: IFundHistoryDataItem;
}

const _FundHistoryFullRow: React.FC<Props> = ({ setClose, item }) => {
  const [t] = useTranslation();
  return (
    <TableRow hoverable={false} className={styles["fund-history__full-row"]}>
      <td colSpan={3}>
        <Center className={styles["fund-history__full-row-container"]}>
          <RowItem wide>
            <Table
              items={[{}, {}, {}]}
              columns={FUND_HISTORY_INNER_COLUMNS}
              renderHeader={(column: SortingColumn) => (
                <span>
                  {t(`fund-details-page:history.history-table.${column.name}`)}
                </span>
              )}
              renderBodyRow={() => (
                <TableRow hoverable={false}>
                  <TableCell>2019-08-22 17:16:27</TableCell>
                  <TableCell>
                    <Center>
                      <RowItem size={"small"}>
                        {getRandomInteger(1, 5)}{" "}
                      </RowItem>
                      <RowItem size={"small"}>
                        <CurrencyItem
                          small
                          name={"GVT"}
                          logo={
                            "https://red-s3.genesis.vision/img/orgn/4311e334-f520-4596-883a-bdef91ceea61.png"
                          }
                        />
                      </RowItem>
                      <RowItem size={"small"}>-></RowItem>
                      <RowItem size={"small"}>
                        {getRandomInteger(10, 15)}
                      </RowItem>
                      <RowItem size={"small"}>
                        <CurrencyItem
                          small
                          name={"USDT"}
                          logo={
                            "https://red-s3.genesis.vision/img/orgn/754bf998-3e8b-41fe-9183-66898571f72e.png"
                          }
                        />
                      </RowItem>
                    </Center>
                  </TableCell>
                  <TableCell>
                    <Center>
                      <RowItem size={"small"}>
                        {getRandomInteger(0, 10) / 1000}
                      </RowItem>
                      <RowItem size={"small"}>
                        <CurrencyItem
                          small
                          name={"USDT"}
                          logo={
                            "https://red-s3.genesis.vision/img/orgn/754bf998-3e8b-41fe-9183-66898571f72e.png"
                          }
                        />
                      </RowItem>
                    </Center>
                  </TableCell>
                </TableRow>
              )}
            />
          </RowItem>
          <RowItem
            className={styles["fund-history__row-control"]}
            onClick={setClose}
          >
            <div className={styles["fund-history__row-control-icon"]}>
              <CollapseIcon />
            </div>
          </RowItem>
        </Center>
      </td>
    </TableRow>
  );
};

const FundHistoryFullRow = React.memo(_FundHistoryFullRow);
export default FundHistoryFullRow;
