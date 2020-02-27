import GV from "components/banners/GV";
import Logo from "components/banners/Logo";
import Text from "components/banners/Text";
import SimpleChart from "components/chart/simple-chart";
import React from "react";
import createBannerApi, { BannerComponent } from "components/banners/utils";

type Position = { y: number };

const Title: React.FC<Position> = ({ children, y }) => {
  return (
    <Text fontSize={14} x={20} y={y} color="rgba(255,255,255,0.5)">
      {children}
    </Text>
  );
};

const Value: React.FC<Position> = ({ children, y }) => {
  return (
    <Text x={220} y={y} fontSize={16} color="#fff" position="end" bold>
      {children}
    </Text>
  );
};

const Label: React.FC = ({ children }) => {
  return (
    <Text fontSize={14} color="#fff" x={56} y={42}>
      {children}
    </Text>
  );
};

const Banner: BannerComponent = props => {
  const points = props.chart.charts[0];
  const statistic = props.chart.statistic;
  return (
    <svg
      width={240}
      height={400}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={240} height={400} fill="#1F2B35" />
      <rect y={337} width={240} height={63} fill="#131E26" />
      <Logo
        href={props.details.publicInfo.logo}
        size={25}
        x={20}
        y={25}
        color={props.details.publicInfo.color}
      />
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

export default createBannerApi(Banner);
