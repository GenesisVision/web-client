import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import programsApi from "services/api-client/programs-api";
import ReactDOM from "react-dom/server";
import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";

interface BannerApiContext extends NextApiRequest {
  query: { id: string };
}

type BannerProps = {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
};

export type BannerComponent = React.ComponentType<BannerProps>;

export default function createBannerApi(Banner: BannerComponent) {
  return async (req: BannerApiContext, res: NextApiResponse) => {
    const {
      query: { id }
    } = req;

    try {
      const details = await programsApi.getProgramDetails(id as string);
      const chart = await programsApi.getProgramProfitPercentCharts(details.id);

      res.statusCode = 200;
      res.setHeader("Content-Type", "image/svg+xml");
      res.send(
        ReactDOM.renderToStaticNodeStream(
          <Banner chart={chart} details={details} />
        )
      );
    } catch (e) {
      res.statusCode = 500;
      res.end();
    }
  };
}
