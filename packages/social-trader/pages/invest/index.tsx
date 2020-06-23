import withDefaultLayout from "decorators/with-default-layout";
import { InvestPage } from "pages/invest/invest.page";
import { InvestAssetsType } from "pages/invest/invest.types";
import React from "react";
import { api } from "services/api-client/swagger-custom-client";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<Props, {}> = ({ assets }) => {
  return <InvestPage assets={assets} />;
};

Page.getInitialProps = async ctx => {
  let assets;
  const take = 20;
  await api
    .platform()
    .getPlatformLandingInfo({
      eventsTake: 0,
      followTake: take,
      programsTake: take,
      fundsTake: take
    })
    .then(({ programs, funds, follows }) => {
      assets = {
        programs: programs.items,
        funds: funds.items,
        follows: follows.items
      };
    });
  return { namespacesRequired: ["invest"], assets };
};

interface Props {
  assets: InvestAssetsType;
}

export default withDefaultLayout(Page);
