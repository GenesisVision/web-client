import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
const CodeItem = ({ code }) => <div className="codes__item">{code}</div>;

const CodeList = ({ codes }) => (
  <div className="codes__list">{codes.map(CodeItem)}</div>
);

const GoogleAuth = ({ t, codes }) => {
  return (
    <div className="dialog codes">
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("2fa.codes.title")}</h2>
        </div>
        <p>{t("2fa.codes.successfully")}</p>
        <p>{t("2fa.codes.recovery_codes")}</p>
        <CodeList codes={codes} />
        <p>{t("2fa.codes.warning")}</p>
      </div>
    </div>
  );
};

const GoogleAuthCodes = translate()(GoogleAuth);

GoogleAuthCodes.propTypes = {
  codes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number
    })
  )
};

export default GoogleAuthCodes;
