import "./switch-with-question.scss";

import classNames from "classnames";
import GVSwitch from "components/gv-selection/gv-switch";
import HelpButton from "components/help-button/help-button";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

const _SwitchWithQuestion: React.FC<Props> = ({
  tooltipContent,
  onChange,
  value,
  onClickHelp,
  name,
  label,
  isPending
}) => {
  return (
    <div className="switch-with-question">
      <HelpContainer tooltipContent={tooltipContent}>
        <HelpButton
          className={classNames("switch-with-question__question", {
            "switch-with-question__question-button": !!tooltipContent
          })}
          onClick={onClickHelp}
        />
      </HelpContainer>
      <div className="switch-with-question__label">{label}</div>
      {value !== undefined && (
        <GVSwitch
          touched={false}
          name={name}
          value={value}
          disabled={isPending}
          color="primary"
          onChange={onChange}
        />
      )}
    </div>
  );
};

const HelpContainer: React.FC<{
  tooltipContent?: string | JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>> = ({ tooltipContent, children }) => {
  switch (!!tooltipContent) {
    case true:
      return (
        <Tooltip
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          render={() => tooltipContent}
        >
          <div className="switch-with-question__question-container">
            {children}
          </div>
        </Tooltip>
      );
    case false:
    default:
      return <>{children}</>;
  }
};

interface Props {
  onChange: VoidFunction;
  value: boolean;
  label: string;
  isPending: boolean;
  name?: string;
  onClickHelp?: VoidFunction;
  tooltipContent?: string | JSX.Element;
}

const SwitchWithQuestion = React.memo(_SwitchWithQuestion);
export default SwitchWithQuestion;
