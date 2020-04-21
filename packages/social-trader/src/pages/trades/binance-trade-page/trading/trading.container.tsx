import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import React from "react";
import {
  getBinanceTrades,
  pingBinanceApi
} from "services/binance/binance-http.service";
import { getUserDataStream } from "services/binance/binance-stream.service";
import { useSockets } from "services/websocket.service";
import { date } from "yup";

interface Props {
  authData: TradeAuthDataType;
}

const _TradingContainer: React.FC<Props> = ({ authData }) => {
  // const { publicKey, privateKey } = authData;
  const { connectSocket } = useSockets();
  /*const userDataStream = getUserDataStream(connectSocket, authData);
  userDataStream.subscribe(data => {
    console.log(data);
  });*/
  const ping = pingBinanceApi();
  ping.subscribe(data => {
    console.log(data);
  });
  return <div>{/*{publicKey} {privateKey}*/}</div>;
};

export const TradingContainer = React.memo(_TradingContainer);
