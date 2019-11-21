import HistoryProvider from "decorators/history-provider/history.provider";
import { AppContextType, AppType } from "next/dist/next-server/lib/utils";
import Router from "next/router";
import React, { Component } from "react";

const withHistoryProvider = (WrappedComponent: AppType | any) => {
  return class extends Component<{ from?: string }> {
    static async getInitialProps(ctx: AppContextType) {
      let { from } = ctx.router.query;
      let pathFrom;
      if (from) {
        if (Array.isArray(from)) {
          from = from[0];
        }
        if (from.length > 0 && from.startsWith("/")) {
          pathFrom = from;
        }
      }

      if (!ctx.ctx.req) {
        if (process.env.NODE_ENV !== "production") {
          Router.events.on("routeChangeComplete", () => {
            const chunksSelector =
              'link[href*="/_next/static/css/styles.chunk.css"]';
            const chunksNodes = document.querySelectorAll(
              chunksSelector
            ) as any;
            const timestamp = new Date().valueOf();
            chunksNodes[0].href = `/_next/static/css/styles.chunk.css?${timestamp}`;
          });
        }
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        from: pathFrom,
        ...componentProps
      };
    }

    render() {
      const { from, ...props } = this.props;
      return (
        <HistoryProvider from={from}>
          <WrappedComponent {...props} />
        </HistoryProvider>
      );
    }
  };
};

export default withHistoryProvider;
