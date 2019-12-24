import "./funds-container.scss";

import classNames from "classnames";
import { FundDetailsListItem } from "gv-api-web";
import React, { useCallback, useRef, useState } from "react";
import FundsList from "routes/ssr/landing-page/components/funds/funds-list";
import FundsIcon from "routes/ssr/landing-page/images/common/funds-icon.svg";

interface Props {
  funds: FundDetailsListItem[];
}

const _FundsContainer: React.FC<Props> = ({ funds }) => {
  const animate = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  const handleScroll = useCallback(
    posFirstItem => {
      if (animate.current) {
        const posAnimate = animate.current.getBoundingClientRect();
        setHide(posAnimate.right > posFirstItem.left);
      }
    },
    [animate.current]
  );

  if (!funds.length) return null;
  return (
    <div className="funds-container">
      <div
        className={classNames("funds-container__info", {
          "funds-container__info--hide": hide,
          "funds-container__info--show": !hide
        })}
        ref={animate}
      >
        <img src={FundsIcon} alt="Funds" className="funds-container__img" />
        <h2 className="funds-container__title">Funds</h2>
        <p className="funds-container__text">
          Receive a 100% bonus on any deposit made on Genesis Markets. The bonus
          is unlocked as soon as you start trading!
        </p>
      </div>
      <FundsList
        funds={funds}
        className="funds-container__list"
        onScroll={handleScroll}
      />
    </div>
  );
};

const FundsContainer = React.memo(_FundsContainer);
export default FundsContainer;
