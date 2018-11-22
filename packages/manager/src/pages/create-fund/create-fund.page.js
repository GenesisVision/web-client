import "./create-fund.page.scss";

import React from "react";
import { translate } from "react-i18next";

import CreateFundContainer from "./create-fund.container";

const CreateFundPage = ({ t }) => (
  <div className="create-fund-page">
    <h1 className="app__title-page">{t("create-fund-page.title")}</h1>
    <CreateFundContainer />
  </div>
);

export default translate()(CreateFundPage);
