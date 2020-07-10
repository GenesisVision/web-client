import clsx from "clsx";
import { getActiveUrl } from "components/active/active.helpers";
import ActivePopup from "components/active/active.popup";
import WalletImage from "components/avatar/wallet-image/wallet-image";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

import styles from "./currency-item.module.scss";

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
    <div data-test-id={symbol}>
      <Row>
        {logo && (
          <RowItem
            size={small ? "small" : undefined}
            className={clsx(styles["currency-item__icon"], {
              [styles["currency-item__icon--medium"]]: !small,
              [styles["currency-item__icon--small"]]: small
            })}
          >
            <WalletImage url={logo} alt={name || symbol} />
          </RowItem>
        )}
        {name && (
          <RowItem>
            {big ? (
              <h1
                className={clsx(styles["currency-item__name--big"], className)}
              >
                {name}
              </h1>
            ) : (
              <div className={clsx(styles["currency-item__name"], className)}>
                {name}
              </div>
            )}
            {rate && (
              <div className={styles["currency-item__rate"]}>{rateString}</div>
            )}
          </RowItem>
        )}
      </Row>
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
