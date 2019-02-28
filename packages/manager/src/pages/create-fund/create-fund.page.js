import "./create-fund.page.scss";

import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import CreateFundContainer from "./create-fund.container";

const CreateFundPage = ({ t }) => (
  <Page title={t("manager.create-fund-page.title")}>
    <div className="create-fund-page">
      <h1>{t("manager.create-fund-page.title")}</h1>
      <CreateFundContainer />
    </div>
  </Page>
);

export default translate()(CreateFundPage);
