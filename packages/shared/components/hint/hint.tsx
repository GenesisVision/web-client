import "./hint.scss";

import classNames from "classnames";
import * as React from "react";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

interface IHintProps {
  content: React.ReactNode;
  tooltipContent: React.ReactNode;
  className: string;
  vertical: VERTICAL_POPOVER_POS;
}

const Hint: React.FC<IHintProps> = ({
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
