import NumberFormat from "react-number-format";
import React from "react";

const DPStatistic = ({ trader }) => {
  return (
    <div className="ti-statistic">
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.investedTokens}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.token.tokenSymbol}</div>
          </div>
          <div className="metric__description">My Tokens</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.investedTokens * trader.token.initialPrice}
              prefix="$"
              decimalScale={2}
              displayType="text"
            />
          </div>
          <div className="metric__description">Est. value</div>
        </div>
      </div>      
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitFromProgram}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">My Profit</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.profitTotal}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">GVT</div>
          </div>
          <div className="metric__description">Total Profit</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
              value={trader.balance}
              // decimalScale={2}
              displayType="text"
            />
            <div className="metric__bubble">{trader.currency}</div>
          </div>
          <div className="metric__description">Balance</div>
        </div>
      </div>
      <div className="tis-item">
        <div className="metric">
          <div className="metric__value">
            <NumberFormat
                value={trader.investedTokens * trader.token.initialPrice / trader.balance * 100}
                decimalScale={2}
                displayType="text"
              />
          </div>
          <div className="metric__description">Your Share</div>
        </div>
      </div>    
    </div>
  );
};

export default DPStatistic;
