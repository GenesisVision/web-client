import { ManagerProfile } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import ManagerPage from "shared/components/manager/manager.page";
import ManagerApi from "shared/services/api-client/manager-api";
import { getTokenName } from "shared/utils/get-token-name";
import nextCookie from "next-cookies";

const Managers: NextPage<OwnProps> = ({ managerProfile, isAuthenticated }) => {
  return (
    <ManagerPage
    managerProfile={managerProfile}
    isAuthenticated={isAuthenticated}
  />
  )
};

Managers.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const managerProfile = await ManagerApi.v10ManagerByIdGet(id as string);
  const tokenName = getTokenName();
  const token = nextCookie(ctx)[tokenName];
  return {
    namespacesRequired: ["translation"],
    isAuthenticated: !!token,
    managerProfile,
  };
};

interface OwnProps {
  managerProfile: ManagerProfile;
  isAuthenticated: boolean;
}

export default withDefaultLayout(Managers);
