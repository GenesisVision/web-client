import "./deposit-details.scss";

import classnames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { RefreshIcon } from "shared/components/icon/refresh-icon";

const DepositDetails = props => {
  const { t, available, service, deposit, className, titleClassName, currency } = props;
  return (
    <div className={classnames("deposit-details", className)}>
      <div
        className={classnames(
          "deposit-details__deposit-amount-title",
          titleClassName
        )}
      >
        {t("manager.create-fund-page.settings.fields.deposit-amount")}
      </div>
      <div className="deposit-details__deposit-amount-value">{`${deposit} ${currency}`}</div>
      <div className="deposit-details__available-amount">
        {t("manager.create-fund-page.settings.fields.available-in-wallet")}
        <span
          className={classnames("deposit-details__available-amount-value", {
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

DepositDetails.propTypes = {
  deposit: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  service: PropTypes.shape({
    fetchProfileHeaderInfo: PropTypes.func.isRequired
  }),
  className: PropTypes.string,
  titleClassName: PropTypes.string
};

export default translate()(DepositDetails);
