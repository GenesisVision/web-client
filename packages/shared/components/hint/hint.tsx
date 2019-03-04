import "./hint.scss";

import classNames from "classnames";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";

export enum HINT_POSITION {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center"
}

interface IHint {
  content: JSX.Element;
  tooltipContent: JSX.Element;
  className: string;
  vertical: HINT_POSITION;
}

const Hint: React.FC<IHint> = ({
  content,
  tooltipContent,
  className,
  vertical
}) => {
  return (
    <div className={classNames("hint", className)}>
      <Tooltip
        vertical={vertical}
        render={() => (
          <div
            className={classNames("hint__tooltip-content", {
              [className + "-tooltip-content"]: className
            })}
          >
            {tooltipContent}
          </div>
        )}
      >
        <div className="hint__content">{content}</div>
      </Tooltip>
    </div>
  );
};

export default Hint;
