import { NextPage, NextPageContext } from "next";
import { AppContextType } from "next-server/dist/lib/utils";
import App from "next/app";
import React, { Component } from "react";
import { StoreCreator } from "redux";

import { initializeStore } from "./src/store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState: any = undefined) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  let t = (window as any)[__NEXT_REDUX_STORE__];
  if (!t) {
    t = initializeStore(initialState);
  }
  return t;
}

const withReduxStore = () => (WrappedComponent: any) =>
  class extends Component {
    reduxStore: any;
    static async getInitialProps(ctx: AppContextType) {
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      (ctx.ctx as any).reduxStore = reduxStore;

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        initialReduxState: reduxStore.getState(),
        //reduxStore: reduxStore,
        ...componentProps
      };
    }

    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      console.log("render redux component");
      let t = this.props;
      return <WrappedComponent {...this.props} reduxStore={this.reduxStore} />;
    }
  };

export default withReduxStore;
