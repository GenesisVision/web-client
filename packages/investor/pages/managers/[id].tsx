import { ManagerProfile } from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";
import ManagerPage from "shared/components/manager/manager.page";
import ManagerApi from "shared/services/api-client/manager-api";
import { AuthRootState } from "shared/utils/types";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { connect } from "react-redux";
import { compose } from "redux";

const Managers: NextPage<Props, {}> = ({ isAuthenticated, managerProfile }) => {
  return (
    <ManagerPage
    isAuthenticated={isAuthenticated}
    managerProfile={managerProfile}
  />
  )
};

const mapStateToProps = (state: AuthRootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

Managers.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const managerProfile = await ManagerApi.v10ManagerByIdGet(id as string);
  return {
    namespacesRequired: ["translation"],
    managerProfile: managerProfile
  };
};

interface StateProps {
  isAuthenticated: boolean;
}

interface OwnProps {
  managerProfile: ManagerProfile;
}

interface Props extends StateProps, OwnProps {}

export default compose(
  connect(mapStateToProps),
  withDefaultLayout
)(Managers);
