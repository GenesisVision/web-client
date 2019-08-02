import { FundsList } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React from "react";
import FundsPage from "shared/components/funds/funds.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import { getFiltersFromContext } from "shared/modules/funds-table/components/funds-table/funds-table-ssr";
import fundsApi from "shared/services/api-client/funds-api";

const Funds: NextPage<{
  funds: FundsList;
}> = ({ funds }) => {
  return <FundsPage funds={funds} />;
};

Funds.getInitialProps = async (ctx: NextPageContext) => {
  const filters = getFiltersFromContext(ctx);
  const funds = await fundsApi.v10FundsGet(filters);
  return {
    funds
  };
};

export default withDefaultLayout(Funds);
