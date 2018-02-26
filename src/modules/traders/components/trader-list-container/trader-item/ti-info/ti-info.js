import { Link } from "react-router-dom";
import React from "react";

import { TRADER_ROUTE } from "../../../../traders.constants";
import avatar from "./avatar.png";

const TIInfo = () => {
  return (
    <div className="trader-profile">
      <div className="row">
        <div className="col-6">
          <img src={avatar} alt="Trader Avatar" />
        </div>
        <div className="col-6">
          <div className="card-block">
            <h5 className="card-title">
              <Link to={TRADER_ROUTE}>title</Link>
            </h5>
            <p className="card-text trader-profile__description">description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TIInfo;
