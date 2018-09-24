import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

const WalletWithdrawBottom = ({ t }) => {
  return (
    <div className="dialog__bottom">
      <GVFormikField
        name="address"
        label={t("wallet-withdraw.address")}
        component={GVTextField}
        autoComplete="off"
      />
      <div className="dialog__buttons">
        <GVButton type="submit" variant="contained" color="primary">
          {t("buttons.confirm")}
        </GVButton>
      </div>
    </div>
  );
};

WalletWithdrawBottom.propTypes = {};

export default translate()(WalletWithdrawBottom);
