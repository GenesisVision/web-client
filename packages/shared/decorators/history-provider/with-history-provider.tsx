import { AppContextType, AppType } from "next-server/dist/lib/utils";
import React, { Component } from "react";
import HistoryProvider from "shared/decorators/history-provider/history.provider";

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
