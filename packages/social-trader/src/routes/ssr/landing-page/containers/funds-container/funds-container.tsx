import "./funds-container.scss";

import { FundDetailsListItem } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";
import FundsList from "routes/ssr/landing-page/components/funds/funds-list";
import FundsIcon from "routes/ssr/landing-page/images/common/funds-icon.svg";

interface Props {
  funds: FundDetailsListItem[];
}

const FundsContainer: React.FC<Props> = ({ funds }) => {
  if (!funds.length) return null;
  const [show, setShow] = useState(true);
  const transitions = useTransition(show, null, {
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const onScroll = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div className="funds-container">
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="funds-container__info"
            >
              <img
                src={FundsIcon}
                alt="Funds"
                className="funds-container__img"
              />
              <h2 className="funds-container__title">Funds</h2>
              <p className="funds-container__text">
                Receive a 100% bonus on any deposit made on Genesis Markets. The
                bonus is unlocked as soon as you start trading!
              </p>
            </animated.div>
          )
      )}
      <FundsList
        funds={funds}
        className="funds-container__list"
        onScroll={onScroll}
      />
    </div>
  );
};

export default FundsContainer;
