import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { fetchProfileHeaderInfo } from "../header/actions/header-actions";
import { RefreshIcon } from "../icon/refresh-icon";

const DepositDetails = props => {
  const { t, available, service, deposit } = props;
  return (
    <div className="create-fund-settings__fill-block create-fund-settings__fill-block--without-border">
      <div className="create-fund-settings__deposit-amount-title create-fund-settings__description">
        {t("manager.create-fund-page.settings.fields.deposit-amount")}
      </div>
      <div className="create-fund-settings__deposit-amount-value">
        {deposit}
      </div>
      <div className="create-fund-settings__available-amount">
        {t("manager.create-fund-page.settings.fields.available-in-wallet")}
        <span
          className={classnames(
            "create-fund-settings__available-amount-value",
            {
              "create-fund-settings__available-amount-value--error":
                available < deposit
            }
          )}
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
  showError: PropTypes.bool,
  available: PropTypes.number.isRequired,
  service: PropTypes.shape({
    fetchProfileHeaderInfo: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
  const headerData = state.profileHeader.info.data;
  return {
    available: headerData.availableGvt || 0
  };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ fetchProfileHeaderInfo }, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate()
)(DepositDetails);
