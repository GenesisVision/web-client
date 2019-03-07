import "./deposit-details.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { RefreshIcon } from "shared/components/icon/refresh-icon";

interface IDepositDetailsProps {
  deposit: number;
  available: number;
  service?: { fetchProfileHeaderInfo(): void };
  className?: string;
  titleClassName?: string;
}

const DepositDetails: React.FC<
  IDepositDetailsProps & InjectedTranslateProps
> = ({
  t,
  available,
  service,
  deposit,
  className = "",
  titleClassName = ""
}) => {
  return (
    <div className={classNames("deposit-details", className)}>
      <div
        className={classNames(
          "deposit-details__deposit-amount-title",
          titleClassName
        )}
      >
        {t("manager.create-fund-page.settings.fields.deposit-amount")}
      </div>
      <div className="deposit-details__deposit-amount-value">{`${deposit} GVT`}</div>
      <div className="deposit-details__available-amount">
        {t("manager.create-fund-page.settings.fields.available-in-wallet")}
        <span
          className={classNames("deposit-details__available-amount-value", {
            "deposit-details__available-amount-value--error":
              available < deposit
          })}
        >
          <NumberFormat
            value={available}
            thousandSeparator=" "
            displayType="text"
            suffix=" GVT"
          />
        </span>
        <span onClick={service.fetchProfileHeaderInfo}>{<RefreshIcon />}</span>
      </div>
    </div>
  );
};

export default translate()(DepositDetails);
