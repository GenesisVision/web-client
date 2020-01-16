import "./wallet-widget.scss";

import classNames from "classnames";
import HeaderIcon from "components/header/header-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import Popover from "components/popover/popover";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletsGrandTotal } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import WalletDeposit, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-deposit/wallet-deposit";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import { formatCurrencyValue } from "utils/formatter";

const WalletWidgetPopoverContent = dynamic(() =>
  import("components/wallet-widget/wallet-widget-popover-content")
);

const _WalletWidget: React.FC<Props> = ({
  data: { currency, available, invested, trading, total },
  className
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <div className={classNames("wallet-widget", className)}>
        <div className="wallet-widget__wallet" onClick={setAnchor}>
          <HeaderIcon>
            <WalletIcon primary={anchor !== undefined} />
          </HeaderIcon>
          <div className="wallet-widget__amount">{`${formatCurrencyValue(
            available,
            currency
          )} ${currency}`}</div>
        </div>
        <HeaderIcon>
          <WalletDeposit type={WALLET_DEPOSIT_BUTTON_TYPE.SMALL} />
        </HeaderIcon>
      </div>
      <Popover anchorEl={anchor} onClose={clearAnchor}>
        <WalletWidgetPopoverContent
          currency={currency}
          available={available}
          total={total}
          clearAnchor={clearAnchor}
          invested={invested}
          trading={trading}
        />
      </Popover>
    </>
  );
};

interface Props {
  data: WalletsGrandTotal;
  className?: string;
}

const WalletWidget = withBlurLoader(React.memo(_WalletWidget));
export default WalletWidget;
