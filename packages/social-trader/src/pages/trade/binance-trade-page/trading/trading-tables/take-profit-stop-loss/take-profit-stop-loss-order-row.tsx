import { Button } from "components/button/button";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalMethodsContext } from "../../contexts/terminal-methods.context";
import { FuturesOrder } from "../../terminal.types";
import { getFuturesTriggerConditionsLabel } from "../../terminal-futures.helpers";

const LastRowItem = styled(RowItem)`
  margin-left: auto;
`;

interface Props {
  order: FuturesOrder;
  label: string;
  tickSize: string;
  symbol: string;
}

const _TakeProfitStopLossOrderRow: React.FC<Props> = ({
  order,
  tickSize,
  label,
  symbol
}) => {
  const [t] = useTranslation();
  const { exchangeAccountId } = useContext(TerminalInfoContext);
  const { cancelOrder } = useContext(TerminalMethodsContext);

  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      exchangeAccountId
    }: {
      options: { symbol: string; orderId: string };
      exchangeAccountId: string;
    }) => cancelOrder(options, exchangeAccountId)
  });

  const handleCancel = () =>
    sendRequest({
      options: { symbol, orderId: String(order.id) },
      exchangeAccountId
    });

  return (
    <>
      <RowItem size={"small"}>
        <Text muted>{label}</Text>
      </RowItem>
      <RowItem>
        <Text>
          {getFuturesTriggerConditionsLabel({
            t,
            tickSize,
            stopPrice: order.stopPrice,
            workingType: order.workingType,
            type: order.type,
            side: order.side
          })}
        </Text>
      </RowItem>
      <LastRowItem>
        <Button
          noPadding
          variant={"text"}
          disabled={isPending}
          isPending={isPending}
          size={"small"}
          color={"danger"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </LastRowItem>
    </>
  );
};

const TakeProfitStopLossOrderRow = React.memo(_TakeProfitStopLossOrderRow);
export default TakeProfitStopLossOrderRow;
