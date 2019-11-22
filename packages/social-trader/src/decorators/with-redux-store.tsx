import authActions from "actions/auth-actions";
import platformActions from "actions/platform-actions";
import { AppType } from "next/dist/next-server/lib/utils";
import React, { Component } from "react";
import { RootState } from "reducers/root-reducer";
import { Store } from "redux";
import { Dispatch } from "redux";
import authService from "services/auth-service";
import { AppWithReduxContext, InitializeStoreType } from "utils/types";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const withReduxStore = (
  initializeStore: InitializeStoreType,
  initialActions?: any[]
) => (WrappedComponent: AppType | any) => {
  function getOrCreateStore(initialState?: RootState) {
    if (isServer) {
      return initializeStore(initialState);
    }

    if (!(window as any)[__NEXT_REDUX_STORE__]) {
      (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    }
    return (window as any)[__NEXT_REDUX_STORE__];
  }
  return class extends Component<{
    initialReduxState: RootState;
    actions: any;
  }> {
    reduxStore: Store;
    static async getInitialProps(ctx: AppWithReduxContext) {
      const reduxStore = getOrCreateStore();

      ctx.ctx.reduxStore = reduxStore;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      const token = authService.getAuthArg(ctx.ctx);
      if (token) {
        reduxStore.dispatch(authActions.updateTokenAction(true));
      }

      if (initialActions) {
        await Promise.all(initialActions);
      }

      return {
        initialReduxState: reduxStore.getState(),
        ...componentProps
      };
    }

    constructor(props: { initialReduxState: RootState; actions: any }) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { initialReduxState, actions, ...props } = this.props;
      return <WrappedComponent {...props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;
