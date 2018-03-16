import React from "react";

import "./ts-cards.css";

const TSCards = ({ totalProfit, avgProfit, investors }) => {
  return (
    <div className="trader-cards">
      <div className="trader-card card">
        <div className="card-body">
          <h3 className="card-title">Profit</h3>
          <h4 className="card-subtitle">{totalProfit} %</h4>
        </div>
      </div>
      <div className="trader-card card">
        <div className="card-body">
          <h3 className="card-title">Avg Profit</h3>
          <h4 className="card-subtitle">{avgProfit} %</h4>
        </div>
      </div>
      <div className="trader-card card">
        <div className="card-body">
          <h3 className="card-title">Investors</h3>
          <h4 className="card-subtitle">{investors}</h4>
        </div>
      </div>
    </div>
  );
};

export default TSCards;
