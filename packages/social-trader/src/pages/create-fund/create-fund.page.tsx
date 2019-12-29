import "components/assets/create-asset/create-asset.scss";

import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CreateFundContainer from "./components/create-fund.container";

const _CreateFundPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t("create-fund-page.title")}>
      <CreateFundContainer />
    </Page>
  );
};

const CreateFundPage = React.memo(_CreateFundPage);

export default CreateFundPage;
