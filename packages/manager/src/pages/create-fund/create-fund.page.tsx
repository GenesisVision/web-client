import "./create-fund.page.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Page from "shared/components/page/page";

import CreateFundContainer from "./components/create-fund.container";

const _CreateFundPage: React.FC<Props> = ({ t, minimumDepositAmount }) => (
  <Page title={t("manager.create-fund-page.title")}>
    <div className="create-fund-page">
      <h1>{t("manager.create-fund-page.title")}</h1>
      <CreateFundContainer minimumDepositAmount={minimumDepositAmount} />
    </div>
  </Page>
);

interface Props extends WithTranslation {
  minimumDepositAmount: number;
}

const CreateFundPage = translate()(_CreateFundPage);
export default CreateFundPage;
