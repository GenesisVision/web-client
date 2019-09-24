import "./spinner.scss";

import * as React from "react";

interface ISpinnerProps {
  isShown?: boolean;
}

const Spinner: React.FC<ISpinnerProps> = React.memo(({ isShown }) =>
  isShown ? (
    <div className="gv-spinner__wrapper">
      <div className="gv-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  ) : null
);

export default Spinner;
