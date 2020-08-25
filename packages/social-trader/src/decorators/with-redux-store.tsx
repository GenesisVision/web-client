import authActions from "actions/auth-actions";
import { AppType } from "next/dist/next-server/lib/utils";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Store } from "redux";
import { AppWithReduxContext, InitializeStoreType } from "utils/types";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const withReduxStore = (
  initializeStore: InitializeStoreType,
  initialActions?: any[]
) => (WrappedComponent: AppType | any) => {
  const getOrCreateStore = (initialState?: RootState) => {
    if (!isServer) {
      if ((window as any)[__NEXT_REDUX_STORE__])
        return (window as any)[__NEXT_REDUX_STORE__];

      const state = initializeStore(initialState);
      (window as any)[__NEXT_REDUX_STORE__] = state;
      return state;
    }
    return initializeStore(initialState);
  };

  return class extends Component<{
    initialReduxState: RootState;
    actions: any;
  }> {
    reduxStore: Store;
    static async getInitialProps(ctx: AppWithReduxContext) {
      const reduxStore = getOrCreateStore();

      if (ctx.ctx) ctx.ctx.reduxStore = reduxStore;
      else ctx.reduxStore = reduxStore;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      if (componentProps.isTokenExist) {
        reduxStore.dispatch(authActions.updateTokenAction(true));
      }

      if (initialActions) {
        await Promise.all(initialActions);
      }

      return {
        reduxStore,
        initialReduxState: reduxStore.getState(),
        ...componentProps
      };
    }

    constructor(props: {
      reduxStore: Store;
      initialReduxState: RootState;
      actions: any;
    }) {
      super(props);
      const hasStore = props.reduxStore && Object.keys(props.reduxStore).length;
      this.reduxStore = hasStore
        ? props.reduxStore
        : getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { initialReduxState, actions, ...props } = this.props;
      return (
        <Provider store={this.reduxStore}>
          <WrappedComponent {...props} reduxStore={this.reduxStore} />
        </Provider>
      );
    }
  };
};

export default withReduxStore;
