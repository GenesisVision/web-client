import "./create-fund.page.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import CreateFundContainer from "./components/create-fund.container";

const _CreateFundPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("manager.create-fund-page.title")}>
      <div className="create-fund-page">
        <h1>{t("manager.create-fund-page.title")}</h1>
        <CreateFundContainer />
      </div>
    </Page>
  );
};

const CreateFundPage = React.memo(_CreateFundPage);

export default CreateFundPage;
