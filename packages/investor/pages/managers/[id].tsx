import { ManagerProfile } from "gv-api-web";
import { NextPage } from "next";
import React from "react";
import ManagerPage from "shared/components/manager/manager.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import ManagerApi from "shared/services/api-client/manager-api";

const Managers: NextPage<Props> = ({ managerProfile }) => {
  return <ManagerPage managerProfile={managerProfile} />;
};

Managers.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const managerProfile = await ManagerApi.v10ManagerByIdGet(id as string);
  return {
    managerProfile
  };
};

interface Props {
  managerProfile: ManagerProfile;
}

export default withDefaultLayout(Managers);
