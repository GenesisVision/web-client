import { Center } from "components/center/center";
import { CurrencyItem } from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { CoinsHistoryEvent } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatCurrencyValue, formatValue } from "utils/formatter";

interface Props {
  event: CoinsHistoryEvent;
}

const _AssetHistoryTableRow: React.FC<Props> = ({ event }) => {
  const { date, trade } = event;
  return (
    <TableRow>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>
        <Center>
          <RowItem size={"small"}>
            {formatCurrencyValue(trade.soldAmount, trade.soldAsset.asset)}
          </RowItem>
          <RowItem size={"small"}>
            <CurrencyItem
              small
              name={trade.soldAsset.asset}
              logo={trade.soldAsset.logoUrl}
            />
          </RowItem>
          <RowItem size={"small"}>→</RowItem>
          <RowItem size={"small"}>
            {formatCurrencyValue(trade.boughtAmount, trade.boughtAsset.asset)}
          </RowItem>
          <RowItem size={"small"}>
            <CurrencyItem
              small
              name={trade.boughtAsset.asset}
              logo={trade.boughtAsset.logoUrl}
            />
          </RowItem>
        </Center>
      </TableCell>
      <TableCell>
        <Text wrap={false}>
          <NumberFormat
            value={trade.price}
            prefix={`$ `}
            thousandSeparator=" "
            displayType="text"
          />
        </Text>
      </TableCell>
      <TableCell>
        <NumberFormat
          value={formatValue(trade.commission, 8)}
          suffix={` ${
            trade.commissionCurrency ? trade.commissionCurrency : ""
          }`}
          thousandSeparator=" "
          displayType="text"
        />
      </TableCell>
    </TableRow>
  );
};

const AssetHistoryTableRow = React.memo(_AssetHistoryTableRow);
export default AssetHistoryTableRow;
