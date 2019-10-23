import "./currency-item.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import ActivePopup from "shared/components/active/active.popup";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import useIsOpen from "shared/hooks/is-open.hook";

const _CurrencyItem: React.FC<Props> = ({
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
            <div className={classNames("currency-item__name", className)}>
              {name}
            </div>
          )}
        </div>
      </a>
      {clickable && (
        <ActivePopup
          open={isOpenPopup}
          onClose={setClosePopup}
          active={name!}
        />
      )}
    </>
  );
};

interface Props {
  clickable?: boolean;
  className?: string;
  small?: boolean;
  logo: string;
  name?: string;
}

export const CurrencyItem = React.memo(_CurrencyItem);
