import copy from "copy-to-clipboard";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import CopyIcon from "shared/components/icon/copy-icon";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

const CodeItem = ({ code }) => (
  <div className="codes__item" key={code}>
    {code}
  </div>
);

const CodeList = ({ codes }) => (
  <div className="codes__list">{codes.map(CodeItem)}</div>
);

const getCodesString = codes => {
  return codes.map(code => code.code).join("\n");
};

const GoogleAuth = ({ t, codes, notifySuccess, notifyError }) => {
  const onCopy = () => {
    try {
      copy(getCodesString(codes));
      notifySuccess(t("2fa.codes.copy-success"));
    } catch (error) {
      notifyError(t("2fa.codes.copy-error"));
    }
  };
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa.codes.title")}</h2>
      </div>
      <div className="dialog__text">
        <p>{t("2fa.codes.successfully")}</p>
        <p>{t("2fa.codes.recovery_codes")}</p>
      </div>
      <CodeList codes={codes} />
      <div className="dialog__buttons">
        <GVButton color="secondary" onClick={onCopy}>
          <CopyIcon />
          &nbsp;
          {t("buttons.copy")}
        </GVButton>
      </div>
      <div className="dialog__info">{t("2fa.codes.warning")}</div>
    </div>
  );
};

const GoogleAuthCodes = compose(
  translate(),
  connect(
    undefined,
    dispatch => ({
      notifySuccess: text => dispatch(alertMessageActions.success(text)),
      notifyError: text => dispatch(alertMessageActions.error(text))
    })
  )
)(GoogleAuth);

GoogleAuthCodes.propTypes = {
  codes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string
    })
  )
};

export default GoogleAuthCodes;
