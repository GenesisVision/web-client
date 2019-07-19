import { FundsList, ProgramsList } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import FundsPage from "pages/funds/funds/funds.page";
import React from "react";
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
    namespacesRequired: ["translation"],
    funds
  };
};

export default withDefaultLayout(Funds);
