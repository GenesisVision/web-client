import "./stat-list.scss";

import classNames from "classnames";
import * as React from "react";
import StatItem from "routes/ssr/landing-page/components/statistics/stat-item";

interface Props {
  className?: string;
}

const _StatList: React.FC<Props> = ({ className }) => (
  <ul className={classNames("stat-list", className)}>
    <StatItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
    <StatItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
    <StatItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
      tag="HOT"
    />
    <StatItem
      title="Genesisi vision"
      text="A Global Cryptocurrency LeaderSince 2013"
    />
  </ul>
);

const StatList = React.memo(_StatList);
export default StatList;
