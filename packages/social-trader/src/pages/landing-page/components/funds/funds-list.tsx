import clsx from "clsx";
import { FundDetailsListItem } from "gv-api-web";
import React, { useCallback, useRef, useState } from "react";

import LPFundCard from "../lp-fund-card/lp-fund-card";
import styles from "./funds-list.module.scss";

interface Props {
  className?: string;
  funds: FundDetailsListItem[];
  onScroll: (posFirstItemLeft: number) => void;
}

const _FundsList: React.FC<Props> = ({ className, funds, onScroll }) => {
  const list = useRef<any>(null);
  const [activeScroll, setActiveScroll] = useState(false);
  const handleScroll = useCallback(() => {
    if (list.current) {
      if (!activeScroll) setActiveScroll(true);
      const firstNodeList = list.current.firstChild;
      const posFirstNodeList = firstNodeList
        ? firstNodeList.getBoundingClientRect()
        : null;
      {
        posFirstNodeList && onScroll(posFirstNodeList.left);
      }
    }
  }, [list.current]);
  return (
    <ul
      className={clsx(styles["funds-list"], className, {
        [styles["funds-list--active"]]: activeScroll
      })}
      onScroll={handleScroll}
      ref={list}
    >
      {funds.map(fund => (
        <li className={styles["funds-list__item"]} key={fund.id}>
          <LPFundCard fund={fund} />
        </li>
      ))}
    </ul>
  );
};

const FundsList = React.memo(_FundsList);
export default FundsList;
