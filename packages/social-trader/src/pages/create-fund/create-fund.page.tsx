import "components/assets/create-asset/create-asset.scss";

import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";

import CreateFundContainer from "./components/create-fund.container";

const _CreateFundPage: React.FC<{ minimumDepositAmount: number }> = ({
  minimumDepositAmount
}) => {
  const [t] = useTranslation();
  return (
    <Page title={t("create-fund-page.title")}>
      <CreateFundContainer minimumDepositAmount={minimumDepositAmount} />
    </Page>
  );
};

const CreateFundPage = React.memo(_CreateFundPage);

export default CreateFundPage;
