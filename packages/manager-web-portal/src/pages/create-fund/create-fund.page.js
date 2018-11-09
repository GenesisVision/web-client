import "./create-fund.page.scss";

import React from "react";
import { translate } from "react-i18next";

import CreateFundContainer from "./create-fund.container";

const CreateFundPage = ({ t }) => (
  <div className="create-fund-page">
    <div className="create-fund-page__title">{t("create-fund-page.title")}</div>
    <CreateFundContainer />
  </div>
);

export default translate()(CreateFundPage);
