import "./advantages-list.scss";

import classNames from "classnames";
import React from "react";
import { TAdvantages } from "routes/ssr/landing-page/static-data/advantages";

import AdvantageItem from "./advantage-item";

interface Props {
  className?: string;
  advantagesItems: TAdvantages[];
  lastItem?: JSX.Element;
}

const _AdvantagesList: React.FC<Props> = ({
  className,
  advantagesItems,
  lastItem
}) => (
  <ul className={classNames("advantages-list", className)}>
    {advantagesItems.map((item, index) => (
      <AdvantageItem
        key={index}
        title={item.title}
        text={item.text}
        image={item.image}
      />
    ))}
    {lastItem && (
      <li className="advantages-list__item advantages-list__item--last">
        {lastItem}
      </li>
    )}
  </ul>
);

const AdvantagesList = React.memo(_AdvantagesList);
export default AdvantagesList;
