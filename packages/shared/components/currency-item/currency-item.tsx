import "./currency-item.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import ActivePopup from "shared/components/active/active.popup";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import useIsOpen from "shared/hooks/is-open.hook";

const _CurrencyItem: React.FC<Props> = ({
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
  return (
    <>
      <a href="http://example.com" onClick={openPopup}>
        <div className="currency-item">
          <div
            className={classNames("currency-item__icon", {
              "currency-item__icon--medium": !small,
              "currency-item__icon--small": small
            })}
          >
            <WalletImage url={logo} alt={name} />
          </div>
          {name && (
            <div>
              <div
                className={classNames("currency-item__name", className, {
                  "currency-item__name--big": big
                })}
              >
                {name}
              </div>
              {rate && <div className="currency-item__rate">{rateString}</div>}
            </div>
          )}
        </div>
      </a>
      {clickable && name && (
        <ActivePopup
          open={isOpenPopup}
          onClose={setClosePopup}
          active={symbol || name}
        />
      )}
    </>
  );
};

interface Props {
  symbol?: string;
  big?: boolean;
  rate?: number;
  clickable?: boolean;
  className?: string;
  small?: boolean;
  logo: string;
  name?: string;
}

export const CurrencyItem = React.memo(_CurrencyItem);
