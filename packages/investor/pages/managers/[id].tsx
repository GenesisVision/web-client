import { ManagerProfile } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import ManagerPage from "shared/components/manager/manager.page";
import ManagerApi from "shared/services/api-client/manager-api";

const Managers: NextPage<{
  managerProfile: ManagerProfile;
}> = ({ managerProfile }) => {
  return <div>{managerProfile}</div>
  // return <ManagerPage
  //   isAuthenticated={false}
  //   managerProfile={managerProfile}
  // />
};

Managers.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  const managerProfile = await ManagerApi.v10ManagerByIdGet(id as string);
  return {
    namespacesRequired: ["translation"],
    managerProfile: managerProfile
  };
};

export default withDefaultLayout(Managers);
