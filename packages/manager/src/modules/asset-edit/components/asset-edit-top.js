import React from "react";
import { translate } from "react-i18next";

import { FUND, PROGRAM } from "../asset-edit.constants";

const AssetEditTop = ({ title, t, type }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>
          {type === PROGRAM && t("manager.edit-program.title")}
          {type === FUND && t("manager.edit-fund.title")}
        </h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

AssetEditTop.propTypes = {};

export default translate()(AssetEditTop);
