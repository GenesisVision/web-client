import "./wallet-item.scss";

import classNames from "classnames";
import React from "react";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";

const _WalletItem: React.FC<Props> = ({ logo, name, small, className }) => {
  return (
    <div className="wallet-item">
      <div
        className={classNames("wallet-item__icon", {
          "wallet-item__icon--medium": !small,
          "wallet-item__icon--small": small
        })}
      >
        <WalletImage url={logo} alt={name} />
      </div>
      <div className={classNames("wallet-item__name", className)}>{name}</div>
    </div>
  );
};

interface Props {
  className?: string;
  small?: boolean;
  logo: string;
  name: string;
}

export const WalletItem = React.memo(_WalletItem);
