import { push } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, Dispatch } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";
import replaceParams from "shared/utils/replace-params";

import NavigationTabs from "./navigation-tabs";

const _NavigationTabsContainer: React.FC<Props> = props => (
  <NavigationTabs tab={props.match.params.tab} {...props} />
);

interface Props extends OwnProps, DispatchProps {
  match: any;
  routes: any;
}

interface OwnProps {
  exploreTabName: string;
  tabRoute: string;
  favoritesTabName: string;
}

interface DispatchProps {
  handleTabChange: (e: any, tab: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Props
): DispatchProps => ({
  handleTabChange: (e, tab) => {
    dispatch(
      push(
        replaceParams(props.routes.FUNDS_TAB_ROUTE, {
          ":tab": tab
        })
      )
    );
  }
});

const NavigationTabsContainer = compose<React.ComponentType<OwnProps>>(
  isAuthenticated,
  withRouter,
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_NavigationTabsContainer);
export default NavigationTabsContainer;
