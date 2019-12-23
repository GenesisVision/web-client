import "./funds-list.scss";

import classNames from "classnames";
import { FundDetailsListItem } from "gv-api-web";
import FundCard from "modules/funds-table/components/funds-table/fund-card";
import React, { useCallback, useRef, useState } from "react";

interface Props {
  className?: string;
  funds: FundDetailsListItem[];
  onScroll: any;
}

const _FundsList: React.FC<Props> = ({ className, funds, onScroll }) => {
  const list = useRef<any>(null);
  const handleScroll = useCallback(() => {
    if (list.current) {
      const firstNodeList = list.current.firstChild;
      const positionsFirstNodeList = firstNodeList
        ? firstNodeList.getBoundingClientRect()
        : null;
      onScroll(positionsFirstNodeList.left);
    }
  }, []);
  return (
    <ul
      className={classNames("funds-list", className)}
      onScroll={handleScroll}
      ref={list}
    >
      {funds.map(fund => (
        <FundCard key={fund.id} fund={fund} />
      ))}
    </ul>
  );
};

const FundsList = React.memo(_FundsList);
export default FundsList;
