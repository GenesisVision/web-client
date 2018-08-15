import "./wallet-details.scss";

import { WALLET_ROUTE } from "modules/wallet/wallet.constants";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const WalletDetails = props => {
  return (
    <div className="wallet-details">
      <div className="wallet-details__item">
        <div className="wallet-details__title">Total balance</div>
        <div className="wallet-details__value">{`${
          props.totalBalanceGvt
        } GVT`}</div>
      </div>
      <div className="wallet-details__item">
        <div className="wallet-details__title">Invested value</div>
        <div className="wallet-details__value">{`${
          props.investedGvt
        } GVT`}</div>
      </div>
      <div className="wallet-details__item">
        <div className="wallet-details__title">Available</div>
        <div className="wallet-details__value">{`${
          props.availableGvt
        } GVT`}</div>
      </div>
      <div className="wallet-details__item">
        <div className="wallet-details__value">
          <Link to={WALLET_ROUTE}>Details</Link>
        </div>
      </div>
    </div>
  );
};

WalletDetails.propTypes = {
  totalBalanceGvt: PropTypes.number,
  investedGvt: PropTypes.number,
  availableGvt: PropTypes.number
};

export default WalletDetails;
