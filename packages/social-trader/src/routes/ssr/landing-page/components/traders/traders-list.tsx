import "./traders-list.scss";

import classNames from "classnames";
import * as React from "react";

import TraderItem from "./trader-item";

interface Props {
  className?: string;
}

const _TradersList: React.FC<Props> = ({ className }) => (
  <ul className={classNames("traders-list", className)}>
    <TraderItem
      title="Luke Hudson 1"
      data="1.5k"
      url="61b1301c-796f-4f5c-bf37-7540bf72aa7b"
    />
    <TraderItem title="Luke Hudson 2" data="1.5k" url="" />
    <TraderItem
      title="Luke Hudson 3"
      data="1.5k"
      url="2ef91289-7a0e-4762-81f6-b6962300fb0d"
    />
    <TraderItem
      title="Luke Hudson 4"
      data="1.5k"
      url="016da29f-ca9d-4797-a5db-22908a80fc7e"
    />
  </ul>
);

const TradersList = React.memo(_TradersList);
export default TradersList;
