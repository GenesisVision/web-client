import NumberFormat from "react-number-format";
import React from "react";

const TIStatistic = () => {
  return (
    <div className="trader-overall-stats">
      <div className="row form-group">
        <div className="col-sm-2">
          <div>
            <span className="trader-overall-stats__header">Tokens</span>
          </div>
          <div>
            <NumberFormat
              value={100}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <div>
            <span className="trader-overall-stats__header">Currency</span>
          </div>
          <div>UDS</div>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-outline-primary">Buy token</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div>
            <span className="trader-overall-stats__header">Trades</span>
          </div>
          <div>{5}</div>
        </div>
        <div className="col">
          <div>
            <span className="trader-overall-stats__header">Weeks</span>
          </div>
          <div>{2}</div>
        </div>
        <div className="col">
          <div>
            <span className="trader-overall-stats__header">Profit Total</span>
          </div>
          <div>
            <NumberFormat value={100} displayType={"text"} suffix={"%"} />
          </div>
        </div>
        <div className="col">
          <div>
            <span className="trader-overall-stats__header">Last Profit</span>
          </div>
          <div>
            <NumberFormat value={10} displayType={"text"} suffix={"%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TIStatistic;
