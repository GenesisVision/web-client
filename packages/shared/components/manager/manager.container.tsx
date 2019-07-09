import "./manager.page.scss";

import { goBack } from "connected-react-router";
import { ManagerProfile } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import useIsOpen from "shared/hooks/is-open.hook";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { AuthRootState } from "shared/utils/types";

import ManagerPage from "./manager.page";
import ManagerPageLoader from "./manager.page.loader";
import { fetchManagerProfile } from "./services/manager.service";

const _ManagerContainer: React.FC<Props> = ({ isAuthenticated, service }) => {
  const [managerProfile, setManagerProfile] = useState<
    ManagerProfile | undefined
  >(undefined);
  const [isPending, setIsPending, setNotPending] = useIsOpen();
  useEffect(() => {
    service
      .fetchManagerProfile()
      .then(setManagerProfile)
      .then(setNotPending);
  }, []);
  return (
    <ManagerPage
      loader={<ManagerPageLoader />}
      condition={!isPending && !!managerProfile}
      managerProfile={managerProfile!}
      isAuthenticated={isAuthenticated}
    />
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchManagerProfile, goBack },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {}

interface StateProps {
  isAuthenticated: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchManagerProfile: typeof fetchManagerProfile;
  goBack: typeof goBack;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const ManagerContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ManagerContainer);
export default ManagerContainer;
