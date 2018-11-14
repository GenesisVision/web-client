import React from "react";
import { translate } from "react-i18next";

const ReallocateTop = ({ title, t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("reallocate.title")}</h2>
      </div>
    </div>
  );
};

ReallocateTop.propTypes = {};

export default translate()(ReallocateTop);
