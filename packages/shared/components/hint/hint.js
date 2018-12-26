import "./hint.scss";

import classnames from "classnames";
import React from "react";
import Tooltip from "shared/components/tooltip/tooltip";

const Hint = ({ content, tooltipContent, className, vertical }) => {
  return (
    <div className={classnames("hint", className)}>
      <Tooltip
        vertical={vertical}
        render={() => (
          <div
            className={classnames("hint__tooltip-content", {
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
