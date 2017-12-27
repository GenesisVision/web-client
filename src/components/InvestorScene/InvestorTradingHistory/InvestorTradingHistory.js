import React from 'react';
import { Table } from 'reactstrap';
import { dateFormat } from '../../../utils/formatter';

const InvestorTradingHistory = props => {
  const tradeRows = props.trades.map((trade, idx) => (
    <tr key={idx}>
      <th scope='row'>{idx + 1}</th>
      <td>{trade.traderName}</td>
      <td>{trade.tokens}</td>
      <td>{dateFormat(trade.date)}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Trader</th>
          <th>Tokens</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {tradeRows}
      </tbody>
    </Table>
  );
};

export default InvestorTradingHistory;
