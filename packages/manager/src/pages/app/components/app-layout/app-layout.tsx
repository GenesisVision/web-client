import "./app-layout.scss";

import * as React from "react";
import { connect } from "react-redux";
import platformActions from "shared/actions/platform-actions";
import { initOnResizeEvent } from "shared/actions/ui-actions";
import HeaderContainer from "shared/components/header/header.container";
import NotificationsContainer from "shared/components/notifications/components/notifications-container";
import { MiddlewareDispatch } from "shared/utils/types";

class _AppLayout extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPlatformSettings();
    this.props.initOnResizeEvent();
  }

  render() {
    return (
      <div className="app__wrapper">
        <div className="app">
          <div className="app__header">
            <HeaderContainer />
          </div>
          <div className="app__main">{this.props.children}</div>
          <NotificationsContainer />
        </div>
        <div id="modal-root" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  fetchPlatformSettings: () => dispatch(platformActions.fetchPlatformSettings),
  initOnResizeEvent: () => dispatch(initOnResizeEvent())
});

interface Props extends DispatchProps, OwnProps {}

interface OwnProps {}

interface DispatchProps {
  fetchPlatformSettings: () => void;
  initOnResizeEvent: () => void;
}

const AppLayout = connect<null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps,
  null,
  { pure: false }
)(_AppLayout);
export default AppLayout;
