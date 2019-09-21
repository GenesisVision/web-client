import "./wallet-widget.scss";

import classNames from "classnames";
import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import { getRandomInteger, getRandomText } from "shared/utils/helpers";

export const WalletWidgetTxtLoader: React.FC<{
  className?: string;
}> = React.memo(({ className }) => (
  <div className={classNames("wallet-widget", className)}>
    <div className="wallet-widget__wallet">
      <WalletIcon />
      <span className="wallet-widget__value">
        <div className="wallet-widget__loader">
          {getRandomText({
            length: getRandomInteger(3, 9),
            charset: "numeric"
          })}{" "}
          {getRandomText({
            length: getRandomInteger(3, 4),
            charset: "alphabetic"
          })}
        </div>
      </span>
    </div>
    <div className="wallet-widget__add">
      <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
    </div>
  </div>
));
