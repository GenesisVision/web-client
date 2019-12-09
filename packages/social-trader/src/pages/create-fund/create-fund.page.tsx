import "components/assets/create-asset/create-asset.scss";

import Page from "components/page/page";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundMinDepositAmountSelector } from "reducers/platform-reducer";

import CreateFundContainer from "./components/create-fund.container";

const _CreateFundPage: React.FC = ({}) => {
  const [t] = useTranslation();
  const minimumDepositAmounts = useSelector(fundMinDepositAmountSelector);
  const minimumDepositAmount = minimumDepositAmounts.find(
    ({ currency }) => currency === "GVT"
  )!.amount;
  return (
    <Page title={t("create-fund-page.title")}>
      <CreateFundContainer minimumDepositAmount={minimumDepositAmount} />
    </Page>
  );
};

const CreateFundPage = React.memo(_CreateFundPage);

export default CreateFundPage;
