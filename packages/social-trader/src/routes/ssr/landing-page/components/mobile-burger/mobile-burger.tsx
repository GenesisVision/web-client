import "./mobile-burger.scss";

import classNames from "classnames";
import React from "react";

interface Props {
  onClick(): void;
  menuOpen: boolean;
}

export const MobileBurger: React.FC<Props> = ({ onClick, menuOpen }) => (
  <button
    onClick={onClick}
    className={classNames("mobile-burger", {
      "mobile-burger--open-menu": menuOpen
    })}
  >
    <span className="mobile-burger__item" />
    <span className="mobile-burger__item" />
  </button>
);
