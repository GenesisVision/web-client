import React from "react";

import "./tokens-widget.css";

const calcPercent = (val, min, max) => (val - min) / (max - min || 1) * 100;

const TokensWidget = ({ invested, requested, total, showHeader = true }) => {
  const investedPercent = calcPercent(invested, 0, total);
  const requestedPercent = calcPercent(invested + requested, 0, total);

  return (
    <div className="tokens-widget">
      {showHeader && <div className="tokens-widget__header">Tokens</div>}
      <div className="tokens-widget__container">
        <div
          className="tokens-widget__value tokens-widget__value--invested"
          style={{ width: `${investedPercent}%` }}
        />
        <div
          className="tokens-widget__value tokens-widget__value--requested"
          style={{ width: `${requestedPercent}%` }}
        />
      </div>
    </div>
  );
};

export default TokensWidget;
