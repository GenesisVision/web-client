import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
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
import styled from "styled-components";
import { formatDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

interface Props {
  item: IFundHistoryDataItem;
}

const TableContainer = styled.div`
  box-shadow: inset 0px 25px 31px -17px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
`;

const _FundHistoryFullRow: React.FC<Props> = ({ item }) => {
  const [t] = useTranslation();
  return (
    <TableRow hoverable={false}>
      <td colSpan={3}>
        <TableContainer>
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
                    <RowItem size={"small"}>
                      {formatCurrencyValue(soldAmount, soldAsset.asset)}
                    </RowItem>
                    <RowItem size={"small"}>
                      <CurrencyItem
                        small
                        name={soldAsset.asset}
                        logo={soldAsset.logoUrl}
                      />
                    </RowItem>
                    <RowItem size={"small"}>→</RowItem>
                    <RowItem size={"small"}>
                      {formatCurrencyValue(boughtAmount, boughtAsset.asset)}
                    </RowItem>
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
                  {formatValue(commission, 8)} {commissionCurrency}
                </TableCell>
              </TableRow>
            )}
          />
        </TableContainer>
      </td>
    </TableRow>
  );
};

const FundHistoryFullRow = React.memo(_FundHistoryFullRow);
export default FundHistoryFullRow;
