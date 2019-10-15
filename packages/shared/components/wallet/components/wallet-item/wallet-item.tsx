import "./wallet-item.scss";

import classNames from "classnames";
import React from "react";

const _WalletItem: React.FC<Props> = ({
  logo,
  name,
  size = WALLET_ITEM_SIZE.MEDIUM
}) => {
  return (
    <div className="wallet-item">
      <div
        className={classNames("wallet-item__icon", {
          "wallet-item__icon--medium": size === WALLET_ITEM_SIZE.MEDIUM,
          "wallet-item__icon--small": size === WALLET_ITEM_SIZE.SMALL
        })}
      >
        <img src={logo} alt="wallet" />
      </div>
      <div className="wallet-item__name">{name}</div>
    </div>
  );
};

export enum WALLET_ITEM_SIZE {
  MEDIUM = "MEDIUM",
  SMALL = "SMALL"
}

interface Props {
  size?: WALLET_ITEM_SIZE;
  logo: string;
  name: string;
}

export const WalletItem = React.memo(_WalletItem);
