import "./hint.scss";

import classNames from "classnames";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

const Hint: React.FC<Props> = ({
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

interface Props {
  content: React.ReactNode;
  tooltipContent: React.ReactNode;
  className?: string;
  vertical: VERTICAL_POPOVER_POS;
}
