import { ProfileHeaderViewModel } from "gv-api-web";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { logout } from "shared/components/auth/signin/signin.service";
import Header from "shared/components/header/header";
import {
  fetchProfileHeaderInfo,
  fetchTwoFactor,
  notificationsToggle
} from "shared/components/header/header.service";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { headerSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";

class _HeaderContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.fetchHeaderInfo();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated)
      this.fetchHeaderInfo();
  }

  fetchHeaderInfo = () => {
    const { isAuthenticated, service } = this.props;
    if (isAuthenticated) {
      service.fetchProfileHeaderInfo();
      service.fetchTwoFactor();
    }
  };

  render() {
    const { service, info, isAuthenticated, router } = this.props;
    return (
      <Header
        profileHeader={info}
        backPath={router.pathname}
        isAuthenticated={isAuthenticated}
        logout={service.logout}
        openNotifications={service.notificationsToggle}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      fetchProfileHeaderInfo,
      logout,
      notificationsToggle,
      fetchTwoFactor
    },
    dispatch
  )
});

const mapStateToProps = (state: RootState): StateProps => ({
  info: headerSelector(state),
  isAuthenticated: isAuthenticatedSelector(state)
});

interface Props extends StateProps, DispatchProps, WithRouterProps, OwnProps {}

interface StateProps {
  isAuthenticated: boolean;
  info?: ProfileHeaderViewModel;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchProfileHeaderInfo: typeof fetchProfileHeaderInfo;
  logout: typeof logout;
  notificationsToggle: typeof notificationsToggle;
  fetchTwoFactor: typeof fetchTwoFactor;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

const HeaderContainer = compose<React.ComponentType<OwnProps>>(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_HeaderContainer);
export default HeaderContainer;
