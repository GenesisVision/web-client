import "./currency-item.scss";

import classNames from "classnames";
import React from "react";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";

const _CurrencyItem: React.FC<Props> = ({ logo, name, small, className }) => {
  return (
    <div className="currency-item">
      <div
        className={classNames("currency-item__icon", {
          "currency-item__icon--medium": !small,
          "currency-item__icon--small": small
        })}
      >
        <WalletImage url={logo} alt={name} />
      </div>
      <div className={classNames("currency-item__name", className)}>{name}</div>
    </div>
  );
};

interface Props {
  className?: string;
  small?: boolean;
  logo: string;
  name: string;
}

export const CurrencyItem = React.memo(_CurrencyItem);
