import "./traders-list.scss";

import classNames from "classnames";
import * as React from "react";

import TraderItem from "./trader-item";

interface Props {
  className?: string;
}

const _TradersList: React.FC<Props> = ({ className }) => (
  <ul className={classNames("traders-list", className)}>
    <TraderItem title="Luke Hudson 1" data="1.5k" url="" />
    <TraderItem title="Luke Hudson 2" data="1.5k" url="" />
    <TraderItem title="Luke Hudson 3" data="1.5k" url="" />
    <TraderItem title="Luke Hudson 4" data="1.5k" url="" />
  </ul>
);

const TradersList = React.memo(_TradersList);
export default TradersList;
