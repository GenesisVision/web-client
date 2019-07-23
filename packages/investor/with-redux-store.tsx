import { AppContextType, NextPageContext } from "next-server/dist/lib/utils";
import React, { Component } from "react";
import { RootState } from "shared/reducers/root-reducer";
import { InitializeStoreType } from "shared/utils/types";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(
  initializeStore: InitializeStoreType,
  initialState?: RootState
) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return (window as any)[__NEXT_REDUX_STORE__];
}

const withReduxStore = (initializeStore: InitializeStoreType) => (
  WrappedComponent: any
) =>
  class extends Component {
    reduxStore: any;
    static async getInitialProps(ctx: AppContextType) {
      const reduxStore = getOrCreateStore(initializeStore);

      // Provide the store to getInitialProps of pages
      (ctx.ctx as NextPageWithReduxContext).reduxStore = reduxStore;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        initialReduxState: reduxStore.getState(),

        //...componentProps,
        reduxStore: reduxStore
      };
    }

    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(
        initializeStore,
        props.initialReduxState
      );
      //this.reduxStore = props.reduxStore;
    }

    render() {
      let t = this.props;
      return (
        <WrappedComponent {...this.props} /* reduxStore={this.reduxStore}  */ />
      );
    }
  };

export default withReduxStore;

type NextPageWithReduxContext = NextPageContext & { reduxStore: any };
