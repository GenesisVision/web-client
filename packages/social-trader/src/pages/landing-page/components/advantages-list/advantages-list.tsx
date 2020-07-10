import clsx from "clsx";
import { TAdvantages } from "pages/landing-page/static-data/advantages";
import React from "react";

import AdvantageItem from "./advantage-item";
import styles from "./advantages-list.module.scss";

interface Props {
  className?: string;
  advantagesItems: TAdvantages[];
  lastItem?: {
    element: JSX.Element;
    isHided?: boolean;
  };
}

const _AdvantagesList: React.FC<Props> = ({
  className,
  advantagesItems,
  lastItem
}) => (
  <ul className={clsx(styles["advantages-list"], className)}>
    {advantagesItems.map((item, index) => (
      <AdvantageItem
        key={index}
        title={item.title}
        text={item.text}
        image={item.image}
      />
    ))}
    {lastItem && (
      <li
        className={clsx(
          styles["advantages-list__item"],
          styles["advantages-list__item--last"],
          { [styles["advantages-list__item--last-is-hided"]]: lastItem.isHided }
        )}
      >
        {lastItem.element}
      </li>
    )}
  </ul>
);

const AdvantagesList = React.memo(_AdvantagesList);
export default AdvantagesList;
