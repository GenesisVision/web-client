import "./manager.page.scss";

import { goBack } from "connected-react-router";
import { ManagerProfile } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { SLUG_URL_REGEXP } from "shared/utils/constants";
import { AuthRootState } from "shared/utils/types";

import ManagerPage from "./manager.page";
import ManagerPageLoader from "./manager.page.loader";
import { fetchManagerProfile } from "./services/manager.service";

class _ManagerContainer extends React.PureComponent<Props, State> {
  state = {
    managerProfile: undefined,
    isPending: false
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchManagerProfile().then(profile => {
      this.setState({ managerProfile: profile, isPending: false });
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { managerProfile, isPending } = this.state;

    return (
      <ManagerPage
        loader={<ManagerPageLoader />}
        condition={!isPending && !!managerProfile}
        managerProfile={managerProfile!}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

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

interface State {
  managerProfile?: ManagerProfile;
  isPending: boolean;
}

const ManagerContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AuthRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(_ManagerContainer);
export default ManagerContainer;
