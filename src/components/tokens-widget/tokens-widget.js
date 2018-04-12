import React from "react";

import { UncontrolledTooltip } from "reactstrap";
import "./tokens-widget.css";

const calcPercent = (val, min, max) => (val - min) / (max - min || 1) * 100;

const TokensWidget = ({
  id,
  invested,
  requested,
  total,
  showHeader = true
}) => {
  const investedPercent = calcPercent(invested, 0, total);
  const requestedPercent = calcPercent(requested, 0, total);
  const freePercent = 100 - requestedPercent - investedPercent;

  return (
    <div className="tokens-widget">
      {showHeader && <div className="tokens-widget__header">Tokens</div>}
      <div className="tokens-widget__container">
        <div
          id={`invested_${id}`}
          className="tokens-widget__value tokens-widget__value--invested"
          style={{ width: `${investedPercent}%` }}
        />
        <div
          id={`requested_${id}`}
          className="tokens-widget__value tokens-widget__value--requested"
          style={{ width: `${requestedPercent}%` }}
        />
        <div
          id={`free_${id}`}
          className="tokens-widget__value tokens-widget__value--free"
          style={{ width: `${freePercent}%` }}
        />
      </div>
      <UncontrolledTooltip placement="bottom" target={`free_${id}`}>
        Free: {`${freePercent.toFixed(2)}%`}
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="bottom" target={`invested_${id}`}>
        Invested: {`${investedPercent.toFixed(2)}%`}
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="bottom" target={`requested_${id}`}>
        Requested: {`${requestedPercent.toFixed(2)}%`}
      </UncontrolledTooltip>
    </div>
  );
};

export default TokensWidget;
