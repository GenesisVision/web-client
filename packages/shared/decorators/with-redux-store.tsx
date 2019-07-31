import { AppContextType, AppType } from "next-server/dist/lib/utils";
import React, { Component } from "react";
import { Store } from "redux";
import authActions from "shared/actions/auth-actions";
import { RootState } from "shared/reducers/root-reducer";
import authService from "shared/services/auth-service";
import {
  InitializeStoreType,
  NextPageWithReduxContext
} from "shared/utils/types";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const withReduxStore = (initializeStore: InitializeStoreType) => (
  WrappedComponent: AppType | any
) => {
  function getOrCreateStore(initialState?: RootState) {
    if (isServer) {
      return initializeStore(initialState);
    }

    if (!(window as any)[__NEXT_REDUX_STORE__]) {
      (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    }
    return (window as any)[__NEXT_REDUX_STORE__];
  }
  return class extends Component<{ initialReduxState: RootState }> {
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

      return {
        initialReduxState: reduxStore.getState(),
        ...componentProps
      };
    }

    constructor(props: { initialReduxState: RootState }) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { initialReduxState, ...props } = this.props;
      return <WrappedComponent {...props} reduxStore={this.reduxStore} />;
    }
  };
};

export default withReduxStore;

interface AppWithReduxContext extends AppContextType {
  ctx: NextPageWithReduxContext;
}
