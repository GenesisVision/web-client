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
  const fontSize = 14;
  const x = 20;
  return (
    <text
      fontSize={fontSize}
      fill="rgba(255,255,255,0.5)"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={x} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  const fontSize = 16;
  const x = 220;
  return (
    <text
      fontSize={fontSize}
      fill="#fff"
      textAnchor="end"
      fontWeight={"bold"}
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={x} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Label: React.FC = ({ children }) => {
  const fontSize = 14;
  const x = 56;
  const y = 31 + fontSize - 3;
  return (
    <text
      fontSize={fontSize}
      fill="#fff"
      fontFamily={
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif"
      }
    >
      <tspan x={x} y={y}>
        {children}
      </tspan>
    </text>
  );
};

const Logo: React.FC<{ href?: string }> = ({ href }) => {
  if (!href) return null;
  const size = 26;
  const x = 20;
  const y = 25;
  const radius = 7;
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <rect id="rect" x={x} y={y} width={size} height={size} rx={radius} />
        <clipPath id="clip">
          <use xlinkHref="#rect" />
        </clipPath>
      </defs>

      <use xlinkHref="#rect" strokeWidth="0" stroke="black" />
      <image
        x={x}
        y={y}
        href={filesService.getFileUrl(href)}
        width={size}
        height={size}
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
  return (
    <svg
      width="240"
      height="400"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="240" height="400" fill="#1F2B35" />
      <rect y={337} width="240" height="63" fill="#131E26" />
      <Logo href={props.details.publicInfo.logo} />
      <GV y={359} x={69} />
      <Label>{props.details.publicInfo.title}</Label>
      <Title y={92}>Monthly Profit</Title>
      <Value y={92}>{`${statistic.profitPercent}%`}</Value>
      <Title y={122}>Equity</Title>
      <Value y={122}>{`${points.currency}${statistic.balance}`}</Value>
      <SimpleChart
        data={points.chart}
        width={200}
        height={165}
        x={20}
        y={152}
      />
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
