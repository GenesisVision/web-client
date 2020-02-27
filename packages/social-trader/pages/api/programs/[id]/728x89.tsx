import GV from "components/banners/GV";
import SimpleChart from "components/chart/simple-chart";
import {
  ProgramFollowDetailsFull,
  ProgramProfitPercentCharts
} from "gv-api-web";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import ReactDOM from "react-dom/server";
import programsApi from "services/api-client/programs-api";
import filesService from "services/file-service";

type Position = { y: number };

const Title: React.FC<Position> = ({ children, y }) => {
  return (
    <text
      fontSize={12}
      fill="rgba(255,255,255,0.5)"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={138} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <text
      fontSize={16}
      fill="#fff"
      textAnchor="end"
      fontWeight={"bold"}
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={300} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Label: React.FC = ({ children }) => {
  return (
    <text
      fontSize={14}
      fill="#fff"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={25} y={66}>
        {children}
      </tspan>
    </text>
  );
};

const Logo: React.FC<{ href?: string }> = ({ href }) => {
  if (!href) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <rect id="rect" x="25" y="19" width="25" height="25" rx="7" />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>

      <use xlinkHref="#rect" strokeWidth="0" stroke="black" />
      <image
        x="25"
        y="19"
        href={filesService.getFileUrl(href)}
        width="25"
        height="25"
        clipPath="url(#clip)"
      />
    </svg>
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
      width="728"
      height="89"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="728" height="89" fill="#1F2B35" />
      <rect x="588" width="140" height="89" fill="#131E26" />
      <Logo href={props.details.publicInfo.logo} />
      <GV y={35} x={611} />
      <Label>{title}</Label>
      <Title y={39}>Monthly Profit</Title>
      <Value y={39}>{`${statistic.profitPercent} %`}</Value>
      <Title y={66}>Equity</Title>
      <Value y={66}>{`${statistic.balance} ${points.currency}`}</Value>
      <SimpleChart data={points.chart} width={259} height={66} x={329} y={12} />
    </svg>
  );
};

const App = (props: {
  chart: ProgramProfitPercentCharts;
  details: ProgramFollowDetailsFull;
}) => {
  return ReactDOM.renderToStaticNodeStream(
    <Banner1 chart={props.chart} details={props.details} />
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req;

  try {
    const details = await programsApi.getProgramDetails(id as string);
    const chart = await programsApi.getProgramProfitPercentCharts(details.id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(App({ chart, details }));
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
};
