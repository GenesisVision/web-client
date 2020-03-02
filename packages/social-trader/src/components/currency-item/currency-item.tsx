import "./currency-item.scss";

import classNames from "classnames";
import { getActiveUrl } from "components/active/active.helpers";
import ActivePopup from "components/active/active.popup";
import WalletImage from "components/avatar/wallet-image/wallet-image";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

const _CurrencyItem: React.FC<ICurrencyItemProps> = ({
  url,
  symbol,
  big,
  rate,
  logo,
  name,
  small,
  className,
  clickable = true
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const openPopup = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      setOpenPopup();
    },
    []
  );
  const rateString = `1 ${name} = ${rate} $`;
  const renderItemContent = () => (
    <div className="currency-item" data-test-id={symbol}>
      {logo && (
        <div
          className={classNames("currency-item__icon", {
            "currency-item__icon--medium": !small,
            "currency-item__icon--small": small
          })}
        >
          <WalletImage url={logo} alt={name || symbol} />
        </div>
      )}
      {name && (
        <div>
          {big ? (
            <h1 className={classNames("currency-item__name--big", className)}>
              {name}
            </h1>
          ) : (
            <div className={classNames("currency-item__name", className)}>
              {name}
            </div>
          )}
          {rate && <div className="currency-item__rate">{rateString}</div>}
        </div>
      )}
    </div>
  );
  const active = symbol || name || "";
  return (
    (clickable && (
      <>
        <a
          title={active}
          href={getActiveUrl(url || active)}
          onClick={openPopup}
        >
          {renderItemContent()}
        </a>
        <ActivePopup
          open={isOpenPopup}
          onClose={setClosePopup}
          active={active}
        />
      </>
    )) ||
    renderItemContent()
  );
};

export interface ICurrencyItemProps {
  url?: string;
  symbol?: string | CurrencyEnum;
  big?: boolean;
  rate?: number;
  clickable?: boolean;
  className?: string;
  small?: boolean;
  logo?: string;
  name?: string | CurrencyEnum;
}

export const CurrencyItem = React.memo(_CurrencyItem);
