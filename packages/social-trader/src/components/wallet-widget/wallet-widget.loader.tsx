import "./wallet-widget.scss";

import classNames from "classnames";
import Chip, { CHIP_TYPE } from "components/chip/chip";
import { WalletIcon } from "components/icon/wallet-icon";
import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

export const WalletWidgetLoader: React.FC<{ className?: string }> = React.memo(
  ({ className }) => (
    <div className={classNames("wallet-widget", className)}>
      <div className="wallet-widget__wallet">
        <WalletIcon />
        <span className="wallet-widget__value">
          <div style={{ width: 115 }} className="wallet-widget__loader">
            <SvgLoader height={13} width={115}>
              <rect x="0" y="0" rx="5" ry="5" width="80" height="13" />
              <rect x="90" y="0" rx="5" ry="5" width="25" height="13" />
            </SvgLoader>
          </div>
        </span>
      </div>
      <div className="wallet-widget__add">
        <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
      </div>
    </div>
  )
);
