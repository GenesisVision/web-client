import React from "react";

const TSCards = ({ totalProfit, avgProfit, investors }) => {
  return (
    <div className="row">
      <div className="col-md-2 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Profit</h3>
            <h4 className="card-subtitle">{totalProfit} %</h4>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Avg Profit</h3>
            <h4 className="card-subtitle">{avgProfit} %</h4>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Investors</h3>
            <h4 className="card-subtitle">{investors}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TSCards;
