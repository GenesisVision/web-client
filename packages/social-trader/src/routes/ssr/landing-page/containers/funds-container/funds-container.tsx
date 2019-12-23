import "./funds-container.scss";

import { FundDetailsListItem } from "gv-api-web";
import * as React from "react";
import FundsList from "routes/ssr/landing-page/components/funds/funds-list";
import FundsIcon from "routes/ssr/landing-page/images/common/funds-icon.svg";

interface Props {
  funds?: FundDetailsListItem[];
}

const FundsContainer: React.FC<Props> = ({ funds }) => {
  console.log(funds);
  // if (!funds.length) return null;
  return (
    <div className="funds-container">
      <div className="funds-container__info">
        <img src={FundsIcon} alt="Funds" className="funds-container__img" />
        <h2 className="funds-container__title">Funds</h2>
        <p className="funds-container__text">
          Receive a 100% bonus on any deposit made on Genesis Markets. The bonus
          is unlocked as soon as you start trading!
        </p>
      </div>
      <FundsList className="funds-container__list" />
    </div>
  );
};

export default FundsContainer;
