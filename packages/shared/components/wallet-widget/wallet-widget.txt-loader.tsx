import "./wallet-widget.scss";

import classNames from "classnames";
import faker from "faker";
import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { WalletIcon } from "shared/components/icon/wallet-icon";
import { getRandomInteger, getRandomText } from "shared/utils/helpers";

export const WalletWidgetLoaderData: WalletsGrandTotal = {
  currency: "GVT",
  available: faker.random.number(),
  invested: faker.random.number(),
  pending: faker.random.number(),
  total: faker.random.number(),
  currencyCcy: "GVT",
  availableCcy: faker.random.number(),
  investedCcy: faker.random.number(),
  pendingCcy: faker.random.number(),
  totalCcy: faker.random.number()
};

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
