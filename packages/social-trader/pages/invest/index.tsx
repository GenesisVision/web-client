import withDefaultLayout from "decorators/with-default-layout";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import { fetchFunds } from "modules/funds-table/services/funds-table.service";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import { InvestPage } from "pages/invest/invest.page";
import { InvestAssetsType } from "pages/invest/invest.types";
import React from "react";
import { getCookie } from "utils/cookie";
import { CurrencyEnum, NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ assets }) => {
  return <InvestPage assets={assets} />;
};

Page.getInitialProps = async ctx => {
  let assets;
  const { reduxStore } = ctx;
  const take = 20;
  const accountCurrency =
    (getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum) ||
    reduxStore.getState().accountSettings.currency;
  await Promise.all([
    fetchPrograms({ take }).then(({ items }) => items),
    fetchFunds({ take, showIn: accountCurrency }).then(({ items }) => items),
    fetchFollows({ take }).then(({ items }) => items)
  ]).then(([programs, funds, follows]) => {
    assets = { programs, funds, follows };
  });
  return { assets };
};

interface Props {
  assets: InvestAssetsType;
}

export default withDefaultLayout(Page);
