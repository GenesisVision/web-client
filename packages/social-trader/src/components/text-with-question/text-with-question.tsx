import { Center } from "components/center/center";
import HelpButton from "components/help-button/help-button";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

import styles from "./text-with-question.module.scss";

const _SwitchWithQuestion: React.FC<Props> = ({
  tooltipContent,
  onClickHelp,
  label
}) => {
  return (
    <Center>
      <RowItem size={"small"}>
        <HelpContainer tooltipContent={tooltipContent}>
          <HelpButton muted onClick={onClickHelp} />
        </HelpContainer>
      </RowItem>
      <RowItem size={"small"} className={styles["text-with-question__label"]}>
        {label}
      </RowItem>
    </Center>
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
          <div className={styles["text-with-question__question-container"]}>
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
  label: string;
  onClickHelp?: VoidFunction;
  tooltipContent?: string | JSX.Element;
}

const TextWithQuestion = React.memo(_SwitchWithQuestion);
export default TextWithQuestion;
