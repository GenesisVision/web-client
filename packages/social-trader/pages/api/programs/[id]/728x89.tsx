import GV from "components/banners/GV";
import Logo from "components/banners/Logo";
import Text from "components/banners/Text";
import SimpleChart from "components/chart/simple-chart";
import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import ReactDOM from "react-dom/server";
import programsApi from "services/api-client/programs-api";

type Position = { y: number };

const Label: React.FC<Position> = ({ children, y }) => {
  return (
    <Text x={138} y={y} fontSize={12} color="rgba(255,255,255,0.5)">
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={16} color="#fff" position="end" bold x={300} y={y}>
      {children}
    </Text>
  );
};

const Title: React.FC = ({ children }) => {
  return (
    <Text fontSize={14} color="#fff" x={25} y={66}>
      {children}
    </Text>
  );
};

const Banner1 = (props: {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
}) => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;

  let title = props.details.publicInfo.title;
  if (title.length > 10) {
    title = title.slice(0, 10) + "...";
  }

  return (
    <svg
      width={728}
      height={89}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={728} height={89} fill="#1F2B35" />
      <rect x={588} width={140} height={89} fill="#131E26" />
      <Logo
        size={25}
        x={25}
        y={19}
        href={props.details.publicInfo.logo}
        color={props.details.publicInfo.logo}
      />
      <GV y={35} x={611} />
      <Title>{title}</Title>
      <Label y={39}>Monthly Profit</Label>
      <Value y={39}>{`${statistic.profitPercent} %`}</Value>
      <Label y={66}>Equity</Label>
      <Value y={66}>{`${statistic.balance} ${points.currency}`}</Value>
      <SimpleChart data={points.chart} width={259} height={66} x={329} y={12} />
    </svg>
  );
};

interface BannerApiContext extends NextApiRequest {
  query: { id: string };
}

type BannerProps = {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
};

const renderBanner = (Banner: React.ComponentType<BannerProps>) => {
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
};

export default renderBanner(Banner1);
