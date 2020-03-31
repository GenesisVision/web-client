import authActions from "actions/auth-actions";
import { AppType } from "next/dist/next-server/lib/utils";
import React, { Component } from "react";
import { RootState } from "reducers/root-reducer";
import { Store } from "redux";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { AppWithReduxContext, InitializeStoreType } from "utils/types";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const withReduxStore = (
  initializeStore: InitializeStoreType,
  initialActions?: any[]
) => (WrappedComponent: AppType | any) => {
  const getOrCreateStore = (initialState?: RootState) => {
    const state = initializeStore(initialState);
    if (isServer) return state;

    if (!(window as any)[__NEXT_REDUX_STORE__])
      (window as any)[__NEXT_REDUX_STORE__] = state;

    return (window as any)[__NEXT_REDUX_STORE__];
  };

  return class extends Component<{
    initialReduxState: RootState;
    actions: any;
  }> {
    reduxStore: Store;
    static async getInitialProps(ctx: AppWithReduxContext) {
      const reduxStore = getOrCreateStore();
      const token = Token.create(ctx.ctx);

      if (token.isExpiring()) {
        try {
          const newToken = await api.auth(token).updateAuthToken();
          token.restore(newToken);
        } catch (e) {
          token.restore("");
        }
      }

      if (token.isExist()) {
        reduxStore.dispatch(authActions.updateTokenAction(true));
      }

      ctx.ctx.reduxStore = reduxStore;
      ctx.ctx.token = token;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

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
