import "./funds-list.scss";

import classNames from "classnames";
import { FundDetailsListItem } from "gv-api-web";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import React, { useCallback, useRef, useState } from "react";

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
    <div
      className={classNames("funds-list", className, {
        "funds-list--active": true
      })}
      onScroll={handleScroll}
      ref={list}
    >
      {funds.map(fund => (
        <FundCard key={fund.id} fund={fund} />
      ))}
    </div>
  );
};

const FundsList = React.memo(_FundsList);
export default FundsList;
