import "./hint.scss";

import classNames from "classnames";
import * as React from "react";
import Tooltip from "shared/components/tooltip/tooltip";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";

interface IHint {
  content: React.ComponentType;
  tooltipContent: React.ComponentType;
  className: string;
  vertical: VERTICAL_POPOVER_POS;
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
