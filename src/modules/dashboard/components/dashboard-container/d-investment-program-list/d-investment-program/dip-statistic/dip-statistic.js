import React from "react";

const DIPStatistic = ({ program, openDepositModal }) => {
  return (
    <div className="row">
      <div className="col-4">
        <p>Invested: {program.investedTokens} GVT</p>
        <p>EOP: {program.endOfPeriod}</p>
        <p>Last Period Prfit: {program.profitForLastPeriod} GVT</p>
      </div>
      <div className="col-3">
        <p>Total profit: {program.totalProfit} GVT</p>
        <p>Avg profit: {program.avgProfit} GVT</p>
        <p>Balance: {program.balance} GVT</p>
        <p>Avg profit: {program.avgProfit} %</p>
      </div>
      <div className="col-3">
        <p>Avaible Investments: {program.availableInvestment} GVT</p>
        <p>Trades: {program.trades} GVT</p>
        <p>Investors: {program.investors}</p>
      </div>
      <div className="col-2">
        <button className="btn btn-outline-primary" onClick={openDepositModal}>
          Buy tokens
        </button>
        <button className="btn btn-outline-secondary mt-4">Sell tokens</button>
      </div>
    </div>
  );
};

export default DIPStatistic;
