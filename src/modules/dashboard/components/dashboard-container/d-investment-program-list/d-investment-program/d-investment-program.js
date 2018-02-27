import React from "react";

const DInvestmentProgram = ({ program }) => (
  <div className="list-group-item">
    <div className="row">
      <div className="col-3">
        <img src="http://via.placeholder.com/100x50" alt="Program Avatar" />
      </div>
      <div className="col-7">
        <div>{program.name}</div>
        <div>
          {program.tokens} Tokens (${program.tokensUsd} USD)
        </div>
      </div>
      <div className="col-1">
        <div>{program.profit}%</div>
        <div>${program.profitUsd}</div>
      </div>
      <div className="col-1">
        <div>{program.days}</div>
        <div>days</div>
      </div>
    </div>
  </div>
);

export default DInvestmentProgram;
