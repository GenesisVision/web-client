import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
import CollapseIcon from "components/icon/collapse-icon/collapse-icon";
import { RowItem } from "components/row-item/row-item";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Table from "components/table/components/table";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { FundTradingEventViewModel } from "gv-api-web";
import { FUND_HISTORY_INNER_COLUMNS } from "pages/invest/funds/fund-details/fund-details.constants";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./fund-history.module.scss";

interface Props {
  setClose: VoidFunction;
  item: IFundHistoryDataItem;
}

const _FundHistoryFullRow: React.FC<Props> = ({ setClose, item }) => {
  const [t] = useTranslation();
  return (
    <TableRow hoverable={false}>
      <td colSpan={3}>
        <div className={styles["fund-history__full-row"]}>
          <Table
            items={item.trades}
            columns={FUND_HISTORY_INNER_COLUMNS}
            renderHeader={(column: SortingColumn) => (
              <span>
                {t(`fund-details-page:history.history-table.${column.name}`)}
              </span>
            )}
            renderBodyRow={({
              boughtAmount,
              boughtAsset,
              commission,
              commissionCurrency,
              date,
              soldAmount,
              soldAsset
            }: FundTradingEventViewModel) => (
              <TableRow hoverable={false}>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>
                  <Center>
                    <RowItem size={"small"}>{soldAmount}</RowItem>
                    <RowItem size={"small"}>
                      <CurrencyItem
                        small
                        name={soldAsset.asset}
                        logo={soldAsset.logoUrl}
                      />
                    </RowItem>
                    <RowItem size={"small"}>→</RowItem>
                    <RowItem size={"small"}>{boughtAmount}</RowItem>
                    <RowItem size={"small"}>
                      <CurrencyItem
                        small
                        name={boughtAsset.asset}
                        logo={boughtAsset.logoUrl}
                      />
                    </RowItem>
                  </Center>
                </TableCell>
                <TableCell>
                  {formatCurrencyValue(commission, commissionCurrency)}
                  {commissionCurrency}
                </TableCell>
              </TableRow>
            )}
          />
        </div>
      </td>
    </TableRow>
  );
};

const FundHistoryFullRow = React.memo(_FundHistoryFullRow);
export default FundHistoryFullRow;
