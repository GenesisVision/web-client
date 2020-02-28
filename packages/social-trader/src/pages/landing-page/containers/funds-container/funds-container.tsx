import "./funds-container.scss";

import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { FundDetailsListItem } from "gv-api-web";
import FundsList from "pages/landing-page/components/funds/funds-list";
import { JoinButton } from "pages/landing-page/components/join-button";
import FundsIcon from "pages/landing-page/images/common/funds-icon.svg";
import React, { useCallback, useRef, useState } from "react";
import { FUNDS_ROUTE } from "routes/funds.routes";

interface Props {
  funds: FundDetailsListItem[];
}

const _FundsContainer: React.FC<Props> = ({ funds }) => {
  const animate = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);

  const handleScroll = useCallback(
    posFirstItemLeft => {
      if (animate.current) {
        const posAnimate = animate.current.getBoundingClientRect();
        setHide(posAnimate.right > posFirstItemLeft);
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
        <ImageBaseElement
          src={FundsIcon}
          alt="Funds"
          className="funds-container__img"
        />
        <h2 className="funds-container__title">Funds</h2>
        <p className="funds-container__text">
          Diversify your capital across hundreds of cryptocurrencies in one
          click. Select a fund with a composition that matches your opinion on
          the market and let the manager readjust while the market evolves. You
          can withdraw your capital at any time you retain full control of your
          investment.
        </p>
        <JoinButton eventLabel={"Discover"} href={FUNDS_ROUTE}>
          Discover
        </JoinButton>
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
